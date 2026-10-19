# PrepHub — Mock Test Platform

> **Frontend Foundation & Teacher Dashboard**  
> Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS.

PrepHub is a clean, modern mock examination and assessment management platform for educators. This initial phase establishes the frontend foundation, design system, reusable component library, and the **Teacher Dashboard** (`/teacher`) running on realistic, typed local mock data.

---

## 🎨 Design System

- **Primary Brand Color**: Indigo `#4F46E5` (Hover: `#4338CA`)
- **Light Indigo Accent**: `#EEF2FF`
- **Typography & Backgrounds**: Neutral Slate palette (`slate-900` text, `slate-50` background, `slate-200` borders)
- **Layout**: Fixed left sidebar on desktop (`w-64`), collapsible slide-over navigation drawer on mobile and tablets
- **Accessibility**:
  - Focus rings on all interactive elements (`focus-visible:ring-2 focus-visible:ring-indigo-600`)
  - Native reduced-motion support (`prefers-reduced-motion: reduce`)
  - Semantic landmark elements (`<nav>`, `<header>`, `<main>`, `<aside>`, `role="dialog"`)
  - "Skip to main content" link for keyboard navigation

---

## 🚀 Getting Started (Beginner-Friendly Guide)

### Prerequisites

Ensure you have **Node.js** (v18 or higher) installed on your system. You can verify this in your terminal by running:
```bash
node -v
npm -v
```

### 1. Installation

If you are cloning or opening this project for the first time, install the required packages:

```bash
npm install
```
*What this does:* Reads `package.json` and installs Next.js, React, TypeScript, Tailwind CSS, and icon packages into `node_modules`.

### 2. Run the Development Server

Start the local development server:

```bash
npm run dev
```
*What this does:* Starts the Next.js development server with hot-reloading at [http://localhost:3000](http://localhost:3000).

Open your browser and navigate to:
- **Landing Page**: [http://localhost:3000](http://localhost:3000)
- **Teacher Dashboard**: [http://localhost:3000/teacher](http://localhost:3000/teacher)

### 3. Run Quality and Verification Checks

- **TypeScript Type Check**:
  ```bash
  npm run type-check
  ```
  *Verifies that all TypeScript interfaces, component props, and data models are type-safe with no compilation errors.*

- **Code Linting**:
  ```bash
  npm run lint
  ```
  *Runs ESLint with Next.js core web vitals rules to check for code quality issues.*

- **Production Build**:
  ```bash
  npm run build
  ```
  *Compiles and builds the production-ready static pages.*

---

## 📂 Project Architecture

```
PrepHub/
├── src/
│   ├── app/
│   │   ├── globals.css              # Tailwind base, focus rings, reduced-motion overrides
│   │   ├── layout.tsx               # Root application layout and HTML shell
│   │   ├── page.tsx                 # Landing / Welcome page with direct dashboard entry
│   │   └── teacher/
│   │       └── page.tsx             # Teacher Dashboard view (/teacher)
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── CreateTestModal.tsx  # In-memory test creation form with validation
│   │   │   ├── RecentTestsTable.tsx # Search, filter, sort, table & mobile card view
│   │   │   └── StatCard.tsx         # Metric card with trend indicator and icon
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx  # Layout wrapper, skip link, notice modal
│   │   │   ├── Header.tsx           # Sticky top header, mobile toggle, notifications
│   │   │   └── Sidebar.tsx          # Desktop fixed sidebar + mobile slide drawer
│   │   └── ui/
│   │       ├── Avatar.tsx           # Image avatar with initials fallback & status dot
│   │       ├── Badge.tsx            # Status pills (Published, Scheduled, Draft, etc.)
│   │       ├── Button.tsx           # Accessible buttons (primary, secondary, outline, ghost, danger)
│   │       ├── Card.tsx             # Composable card container (Header, Title, Content, Footer)
│   │       └── Modal.tsx            # Accessible dialog modal (Esc key, focus trapped)
│   ├── data/
│   │   └── mockData.ts              # Typed mock data (tests, teacher profile, stats, subjects)
│   └── types/
│       └── index.ts                 # TypeScript type definitions (MockTest, StatMetric, etc.)
├── .eslintrc.json                   # ESLint configuration
├── next.config.mjs                  # Next.js App Router configuration
├── package.json                     # Dependencies and scripts
├── postcss.config.mjs               # PostCSS configuration for Tailwind
├── tailwind.config.ts               # Custom color palette and content configuration
└── tsconfig.json                    # TypeScript compiler options
```

---

## 🧪 What to Test in the Browser

When testing the application in your browser:

1. **Teacher Dashboard Overview (`/teacher`)**:
   - Check the **4 Statistic Cards** (*Total Tests*, *Upcoming Tests*, *Total Attempts*, *Pending Review*).
   - Notice the dynamic counts that reflect the current test list.

2. **Live Search**:
   - Type in the search box (e.g., `"Physics"`, `"Calculus"`, or `"AP"`).
   - Watch the table update in real-time. Notice the "Clear" button and results counter.

3. **Status & Subject Filters**:
   - Select a status filter (e.g. *Published*, *Scheduled*, *Draft*, *Pending Review*).
   - Select a subject filter (e.g. *Chemistry*, *Mathematics*).
   - Filter combinations work seamlessly together.

4. **Empty State & Reset**:
   - Search for a non-existent test (e.g., `"Quantum 999"`).
   - Observe the accessible empty state with a "Reset filters" button.

5. **Create New Test (In-Memory)**:
   - Click the **"Create New Test"** button in the header.
   - Enter a test title, subject, question count, and duration.
   - Click "Save Test". The modal confirms addition and inserts the test at the top of your list.
   - Observe the "Total Tests" stat card increment automatically.

6. **Test Details & Delete**:
   - Click the eye icon (👁️) on any test row to open the full test details modal.
   - Click the trash icon (🗑️) to delete a test for the current session.
   - Click the reset button ("Reset to default sample tests") if you ever want to restore the initial test catalog.

7. **Mobile Responsiveness**:
   - Open browser developer tools (`F12` or `Ctrl+Shift+I`) and toggle device toolbar (`Ctrl+Shift+M`).
   - Test on Mobile (e.g. iPhone / Pixel) and Tablet:
     - The left sidebar hides automatically.
     - Tap the hamburger icon (☰) in the header to reveal the slide-out navigation drawer.
     - The desktop data table switches to readable mobile cards.

8. **Honest Controls**:
   - Click on navigation items marked **"Demo"** or notification bell / export buttons.
   - An informative modal explains that these features are part of the roadmap and that no backend is connected yet.

---

## 🔮 Scope & Constraints

- **Local Mock Only**: All test data resides in local React memory for demonstration. Refreshing the browser resets the data to `initialMockTests`.
- **No Backend / Database Yet**: Supabase, PostgreSQL, and authentication are deliberately excluded at this stage as per project constraints.
