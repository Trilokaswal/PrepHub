import { redirect } from 'next/navigation';

export default function MockTestGenerateRedirectPage() {
  redirect('/tests/generator');
}
