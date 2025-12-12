import { NextResponse } from 'next/server';
import { listLabelIssues } from '@/lib/linear';

export async function GET() {
  try {
    const issues = await listLabelIssues({ first: 50 });
    return NextResponse.json({ issues }, { status: 200 });
  } catch (err) {
    console.error('Linear issues list failed', err);
    if (process.env.NODE_ENV === 'development' && err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to load issues' }, { status: 500 });
  }
}


