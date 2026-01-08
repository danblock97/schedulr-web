import { NextResponse } from 'next/server';
import { getAllAppStoreReviews } from '@/lib/appstore';

export async function GET() {
  try {
    // Fetch more reviews for accurate statistics
    const { stats } = await getAllAppStoreReviews(500);

    return NextResponse.json(stats, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=7200, stale-while-revalidate=14400',
      },
    });
  } catch (error) {
    console.error('App Store stats API failed:', error);

    if (process.env.NODE_ENV === 'development' && error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: 'Failed to fetch App Store statistics' },
      { status: 500 }
    );
  }
}
