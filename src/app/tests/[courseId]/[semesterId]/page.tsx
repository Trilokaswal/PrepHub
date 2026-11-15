import { redirect } from 'next/navigation';

export default async function TestsSemesterAliasPage({
  params,
}: {
  params: Promise<{ courseId: string; semesterId: string }>;
}) {
  const { courseId } = await params;
  redirect(`/courses/${courseId}`);
}
