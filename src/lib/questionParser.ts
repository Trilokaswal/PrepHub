import mammoth from 'mammoth';
import { extractText } from 'unpdf';
import { QuestionType, McqOption } from '@/types';

export interface ParsedQuestionCandidate {
  tempId: string;
  statement: string;
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: QuestionType;
  options: McqOption[];
  correctAnswer: string;
  explanation: string;
  marks: number;
  negativeMarks: number;
  imageUrl?: string;
  // Validation status
  status: 'ready' | 'needs_answer' | 'missing_options' | 'duplicate' | 'invalid';
  validationMessage?: string;
  rawText?: string;
}

export interface ParseResult {
  questions: ParsedQuestionCandidate[];
  totalParsed: number;
  readyCount: number;
  warningCount: number;
  detectedSubject?: string;
  detectedTopic?: string;
}

/**
 * Normalizes question text for duplicate detection
 */
export function normalizeStatement(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Parses CSV text into structured rows, handling quoted values with embedded commas or newlines
 */
export function parseCsvRows(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n
      }
      currentRow.push(currentField.trim());
      if (currentRow.some((f) => f.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((f) => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Parses JSON question string
 */
export function parseJsonQuestions(
  jsonText: string,
  defaultSubject = 'Physics',
  defaultTopic = 'General'
): ParseResult {
  try {
    const parsed = JSON.parse(jsonText);
    const rawList: any[] = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed.questions)
      ? parsed.questions
      : Array.isArray(parsed.data)
      ? parsed.data
      : [parsed];

    const questions: ParsedQuestionCandidate[] = [];

    rawList.forEach((item, idx) => {
      if (!item || typeof item !== 'object') return;

      const statement = String(item.statement || item.question || item.text || '').trim();
      if (!statement) return;

      const subject = String(item.subject || defaultSubject).trim();
      const topic = String(item.topic || defaultTopic).trim();
      const rawDiff = String(item.difficulty || 'Medium').toLowerCase();
      const difficulty: 'Easy' | 'Medium' | 'Hard' =
        rawDiff.includes('easy') || rawDiff.includes('beginner')
          ? 'Easy'
          : rawDiff.includes('hard') || rawDiff.includes('adv')
          ? 'Hard'
          : 'Medium';

      const type: QuestionType = (
        ['single_choice', 'multiple_choice', 'numerical', 'subjective'].includes(item.type)
          ? item.type
          : 'single_choice'
      ) as QuestionType;

      const marks = Number(item.marks) || 4;
      const negativeMarks = item.negativeMarks !== undefined ? Number(item.negativeMarks) : 1;
      const explanation = String(item.explanation || item.solution || '').trim();
      const imageUrl = item.imageUrl || item.image || undefined;

      // Parse options
      let options: McqOption[] = [];
      let correctAnswer = String(item.correctAnswer || item.answer || item.correct_answer || '').trim();

      if (Array.isArray(item.options)) {
        options = item.options.map((opt: any, oIdx: number) => {
          if (typeof opt === 'string') {
            const isCorrect =
              correctAnswer.toLowerCase() === opt.toLowerCase() ||
              correctAnswer.toUpperCase() === String.fromCharCode(65 + oIdx);
            return {
              id: `opt-${oIdx + 1}`,
              text: opt.trim(),
              isCorrect,
            };
          }
          return {
            id: opt.id || `opt-${oIdx + 1}`,
            text: String(opt.text || opt.statement || '').trim(),
            isCorrect: Boolean(opt.isCorrect),
            explanation: opt.explanation,
          };
        });
      }

      // Check if any option is marked correct
      const hasCorrectOpt = options.some((o) => o.isCorrect);
      if (!hasCorrectOpt && correctAnswer && options.length > 0) {
        // Match by A/B/C/D or text
        const upper = correctAnswer.toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(upper)) {
          const charIdx = upper.charCodeAt(0) - 65;
          if (options[charIdx]) {
            options[charIdx].isCorrect = true;
          }
        } else {
          const matchOpt = options.find((o) => o.text.toLowerCase() === correctAnswer.toLowerCase());
          if (matchOpt) matchOpt.isCorrect = true;
        }
      }

      // Status
      let status: ParsedQuestionCandidate['status'] = 'ready';
      let validationMessage: string | undefined;

      if (type === 'single_choice' || type === 'multiple_choice') {
        if (options.length < 2) {
          status = 'missing_options';
          validationMessage = 'MCQ questions require at least 2 options.';
        } else if (!options.some((o) => o.isCorrect)) {
          status = 'needs_answer';
          validationMessage = 'No correct answer detected. Please select one.';
        }
      }

      questions.push({
        tempId: `cand-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 7)}`,
        statement,
        subject,
        topic,
        difficulty,
        type,
        options,
        correctAnswer,
        explanation,
        marks,
        negativeMarks,
        imageUrl,
        status,
        validationMessage,
      });
    });

    const readyCount = questions.filter((q) => q.status === 'ready').length;
    return {
      questions,
      totalParsed: questions.length,
      readyCount,
      warningCount: questions.length - readyCount,
      detectedSubject: questions[0]?.subject,
      detectedTopic: questions[0]?.topic,
    };
  } catch (err: any) {
    throw new Error(`JSON parsing failed: ${err.message}`);
  }
}

/**
 * Parses CSV text into candidate questions
 */
export function parseCsvQuestions(
  csvText: string,
  defaultSubject = 'Physics',
  defaultTopic = 'General'
): ParseResult {
  const rows = parseCsvRows(csvText);
  if (rows.length < 2) {
    throw new Error('CSV must contain a header row and at least one data row.');
  }

  const header = rows[0].map((h) => h.toLowerCase().replace(/[\s_\-]/g, ''));
  const dataRows = rows.slice(1);

  // Find column indices
  const colStatement = header.findIndex((h) => h.includes('question') || h.includes('statement') || h === 'q');
  const colOptA = header.findIndex((h) => h === 'optiona' || h === 'opta' || h === 'a');
  const colOptB = header.findIndex((h) => h === 'optionb' || h === 'optb' || h === 'b');
  const colOptC = header.findIndex((h) => h === 'optionc' || h === 'optc' || h === 'c');
  const colOptD = header.findIndex((h) => h === 'optiond' || h === 'optd' || h === 'd');
  const colAnswer = header.findIndex((h) => h.includes('answer') || h.includes('correct') || h === 'ans');
  const colSubject = header.findIndex((h) => h.includes('subject'));
  const colTopic = header.findIndex((h) => h.includes('topic') || h.includes('chapter'));
  const colDifficulty = header.findIndex((h) => h.includes('difficulty') || h.includes('level'));
  const colExplanation = header.findIndex((h) => h.includes('explanation') || h.includes('solution'));
  const colMarks = header.findIndex((h) => h === 'marks' || h === 'mark');
  const colNegMarks = header.findIndex((h) => h.includes('negative') || h === 'negmarks');
  const colType = header.findIndex((h) => h.includes('type'));

  const questions: ParsedQuestionCandidate[] = [];

  dataRows.forEach((row, idx) => {
    const statement = colStatement >= 0 ? (row[colStatement] || '').trim() : (row[0] || '').trim();
    if (!statement) return;

    const optAText = colOptA >= 0 ? (row[colOptA] || '').trim() : '';
    const optBText = colOptB >= 0 ? (row[colOptB] || '').trim() : '';
    const optCText = colOptC >= 0 ? (row[colOptC] || '').trim() : '';
    const optDText = colOptD >= 0 ? (row[colOptD] || '').trim() : '';

    const answerStr = colAnswer >= 0 ? (row[colAnswer] || '').trim() : '';
    const subject = colSubject >= 0 && row[colSubject] ? row[colSubject].trim() : defaultSubject;
    const topic = colTopic >= 0 && row[colTopic] ? row[colTopic].trim() : defaultTopic;

    const diffRaw = colDifficulty >= 0 && row[colDifficulty] ? row[colDifficulty].toLowerCase().trim() : 'medium';
    const difficulty: 'Easy' | 'Medium' | 'Hard' =
      diffRaw.includes('easy') || diffRaw.includes('beginner')
        ? 'Easy'
        : diffRaw.includes('hard') || diffRaw.includes('adv')
        ? 'Hard'
        : 'Medium';

    const explanation = colExplanation >= 0 && row[colExplanation] ? row[colExplanation].trim() : '';
    const marks = colMarks >= 0 && Number(row[colMarks]) ? Number(row[colMarks]) : 4;
    const negativeMarks = colNegMarks >= 0 && row[colNegMarks] !== '' ? Number(row[colNegMarks]) : 1;

    let type: QuestionType = 'single_choice';
    if (colType >= 0 && row[colType]) {
      const t = row[colType].toLowerCase().trim();
      if (['single_choice', 'multiple_choice', 'numerical', 'subjective'].includes(t)) {
        type = t as QuestionType;
      }
    }

    const rawOptions = [optAText, optBText, optCText, optDText].filter((t) => t.length > 0);
    const options: McqOption[] = rawOptions.map((text, oIdx) => {
      const letter = String.fromCharCode(65 + oIdx);
      const isCorrect =
        answerStr.toUpperCase() === letter ||
        answerStr.toLowerCase() === text.toLowerCase();
      return {
        id: `opt-${oIdx + 1}`,
        text,
        isCorrect,
      };
    });

    let status: ParsedQuestionCandidate['status'] = 'ready';
    let validationMessage: string | undefined;

    if (type === 'single_choice' || type === 'multiple_choice') {
      if (options.length < 2) {
        status = 'missing_options';
        validationMessage = 'Less than 2 options found for MCQ.';
      } else if (!options.some((o) => o.isCorrect)) {
        status = 'needs_answer';
        validationMessage = 'Please select the correct option.';
      }
    }

    questions.push({
      tempId: `cand-csv-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 7)}`,
      statement,
      subject,
      topic,
      difficulty,
      type,
      options,
      correctAnswer: answerStr,
      explanation,
      marks,
      negativeMarks,
      status,
      validationMessage,
    });
  });

  const readyCount = questions.filter((q) => q.status === 'ready').length;
  return {
    questions,
    totalParsed: questions.length,
    readyCount,
    warningCount: questions.length - readyCount,
    detectedSubject: questions[0]?.subject,
    detectedTopic: questions[0]?.topic,
  };
}

/**
 * Intelligent Text / Markdown / Document block parser
 * Detects questions formatted as:
 * 1. Question statement...
 * A) Option 1
 * B) Option 2
 * C) Option 3
 * D) Option 4
 * Answer: A (or B, C, D)
 * Explanation: ...
 * Subject: Physics
 * Topic: Mechanics
 * Difficulty: Medium
 */
export function parseTextOrMarkdownQuestions(
  text: string,
  defaultSubject = 'Physics',
  defaultTopic = 'General'
): ParseResult {
  const lines = text.split(/\r?\n/);
  const blocks: string[][] = [];
  let currentBlock: string[] = [];

  // Question starter regex (e.g. "1.", "Q1.", "Question 1:", "1)", etc.)
  const questionStartRegex = /^\s*(?:question\s*\d+|q\s*\d+|\d+)\s*[\.\:\-\)]\s*(.+)/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (questionStartRegex.test(line)) {
      if (currentBlock.length > 0) {
        blocks.push(currentBlock);
        currentBlock = [];
      }
    }
    currentBlock.push(line);
  }
  if (currentBlock.length > 0) {
    blocks.push(currentBlock);
  }

  // If no numbered question starters were found, fallback to empty line splitting
  const finalBlocks =
    blocks.length > 0
      ? blocks
      : text
          .split(/\n\s*\n/)
          .map((b) => b.split('\n'))
          .filter((b) => b.length > 0);

  const candidates: ParsedQuestionCandidate[] = [];

  finalBlocks.forEach((blockLines, bIdx) => {
    let statement = '';
    const options: McqOption[] = [];
    let correctAnswer = '';
    let explanation = '';
    let subject = defaultSubject;
    let topic = defaultTopic;
    let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';
    let type: QuestionType = 'single_choice';
    let marks = 4;
    let negativeMarks = 1;

    let inStatement = true;

    for (let i = 0; i < blockLines.length; i++) {
      const line = blockLines[i].trim();
      if (!line) continue;

      // Check Option pattern (e.g. "A) ...", "(A) ...", "[A] ...", "A. ...", "a) ...")
      const optMatch = line.match(/^\s*[\(\[]?([A-Da-d])[\)\]\.\:\-]\s*(.+)/);
      // Check Answer line (e.g. "Answer: A", "Ans: B", "Correct: C", "Key: D")
      const ansMatch = line.match(/^\s*(?:answer|ans|correct\s*answer|key)\s*[\:\-]?\s*([A-Da-d]|.+)/i);
      // Check Explanation line
      const expMatch = line.match(/^\s*(?:explanation|solution|rationale)\s*[\:\-]?\s*(.+)/i);
      // Check Subject line
      const subjMatch = line.match(/^\s*subject\s*[\:\-]\s*(.+)/i);
      // Check Topic line
      const topMatch = line.match(/^\s*(?:topic|chapter)\s*[\:\-]\s*(.+)/i);
      // Check Difficulty line
      const diffMatch = line.match(/^\s*difficulty\s*[\:\-]\s*(easy|medium|hard|beginner|advanced)/i);
      // Check Marks line
      const marksMatch = line.match(/^\s*marks\s*[\:\-]\s*(\d+(?:\.\d+)?)/i);

      if (ansMatch) {
        inStatement = false;
        correctAnswer = ansMatch[1].trim();
      } else if (expMatch) {
        inStatement = false;
        explanation = expMatch[1].trim();
      } else if (subjMatch) {
        inStatement = false;
        subject = subjMatch[1].trim();
      } else if (topMatch) {
        inStatement = false;
        topic = topMatch[1].trim();
      } else if (diffMatch) {
        inStatement = false;
        const d = diffMatch[1].toLowerCase();
        difficulty = d.includes('easy') || d.includes('beginner') ? 'Easy' : d.includes('hard') || d.includes('adv') ? 'Hard' : 'Medium';
      } else if (marksMatch) {
        inStatement = false;
        marks = parseFloat(marksMatch[1]) || 4;
      } else if (optMatch) {
        inStatement = false;
        const optLetter = optMatch[1].toUpperCase();
        const optText = optMatch[2].trim();
        const optIndex = optLetter.charCodeAt(0) - 65;
        options.push({
          id: `opt-${options.length + 1}`,
          text: optText,
          isCorrect: false, // will match with correctAnswer below
        });
      } else if (inStatement) {
        // Remove question prefix if starting statement (e.g. "1. ", "Q1: ")
        const cleanLine = line.replace(/^\s*(?:question\s*\d+|q\s*\d+|\d+)\s*[\.\:\-\)]\s*/i, '');
        statement = statement ? `${statement}\n${cleanLine}` : cleanLine;
      } else if (explanation) {
        // Continuation of explanation
        explanation += `\n${line}`;
      }
    }

    if (!statement.trim()) return;

    // Check type based on options
    if (options.length === 0) {
      // Numerical or subjective if no options
      if (/\d+/.test(correctAnswer) && correctAnswer.length <= 10) {
        type = 'numerical';
      } else {
        type = 'subjective';
      }
    } else {
      type = 'single_choice';
    }

    // Match correct answer to options
    if (correctAnswer && options.length > 0) {
      const upper = correctAnswer.toUpperCase().trim();
      if (['A', 'B', 'C', 'D'].includes(upper)) {
        const idx = upper.charCodeAt(0) - 65;
        if (options[idx]) {
          options[idx].isCorrect = true;
        }
      } else {
        // Try exact text match
        const match = options.find((o) => o.text.toLowerCase() === correctAnswer.toLowerCase());
        if (match) {
          match.isCorrect = true;
        }
      }
    }

    let status: ParsedQuestionCandidate['status'] = 'ready';
    let validationMessage: string | undefined;

    if (options.length > 0) {
      if (options.length < 2) {
        status = 'missing_options';
        validationMessage = 'Less than 2 options detected.';
      } else if (!options.some((o) => o.isCorrect)) {
        status = 'needs_answer';
        validationMessage = 'Correct answer not detected. Please select one.';
      }
    }

    candidates.push({
      tempId: `cand-txt-${Date.now()}-${bIdx}-${Math.random().toString(36).substring(2, 7)}`,
      statement: statement.trim(),
      subject,
      topic,
      difficulty,
      type,
      options,
      correctAnswer,
      explanation,
      marks,
      negativeMarks,
      status,
      validationMessage,
      rawText: blockLines.join('\n'),
    });
  });

  const readyCount = candidates.filter((q) => q.status === 'ready').length;
  return {
    questions: candidates,
    totalParsed: candidates.length,
    readyCount,
    warningCount: candidates.length - readyCount,
    detectedSubject: candidates[0]?.subject,
    detectedTopic: candidates[0]?.topic,
  };
}

/**
 * Extracts raw text from DOCX file using mammoth
 */
export async function parseDocxFile(
  arrayBuffer: ArrayBuffer,
  defaultSubject = 'Physics',
  defaultTopic = 'General'
): Promise<ParseResult> {
  try {
    const result = await mammoth.extractRawText({ arrayBuffer });
    const rawText = result.value || '';
    if (!rawText.trim()) {
      throw new Error('No readable text found in DOCX file.');
    }
    return parseTextOrMarkdownQuestions(rawText, defaultSubject, defaultTopic);
  } catch (err: any) {
    throw new Error(`Failed to read DOCX file: ${err.message}`);
  }
}

/**
 * Extracts raw text from PDF file using unpdf
 */
export async function parsePdfFile(
  arrayBuffer: ArrayBuffer,
  defaultSubject = 'Physics',
  defaultTopic = 'General'
): Promise<ParseResult> {
  try {
    const { text } = await extractText(new Uint8Array(arrayBuffer));
    const allText = Array.isArray(text) ? text.join('\n\n') : String(text || '');
    if (!allText.trim()) {
      throw new Error('No readable text extracted from PDF file.');
    }
    return parseTextOrMarkdownQuestions(allText, defaultSubject, defaultTopic);
  } catch (err: any) {
    throw new Error(`Failed to parse PDF file: ${err.message}`);
  }
}
