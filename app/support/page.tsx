import { listIssues } from '@/lib/linear';
import SupportPageContent from './SupportPageContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support - Schedulr',
  description: 'Get help with Schedulr, report bugs, or contact our support team.',
};

export const dynamic = 'force-dynamic';

export default async function SupportPage() {
  let issues = null;
  let loadError: string | null = null;

  try {
    issues = await listIssues(['Schedulr App', 'Bug'], { first: 50 });
  } catch (err) {
    console.error('Failed to load Linear issues for /support', err);
    if (process.env.NODE_ENV === 'development' && err instanceof Error) {
      loadError = `Issues unavailable (dev): ${err.message}`;
    } else {
      loadError = 'Issues are temporarily unavailable. Please try again later.';
    }
  }

  return <SupportPageContent initialIssues={issues} loadError={loadError} />;
}
