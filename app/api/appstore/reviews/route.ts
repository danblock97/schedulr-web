import { NextResponse } from 'next/server';
import { getAppStoreReviews } from '@/lib/appstore';
import type { AppStoreReviewsResponse } from '@/lib/appstore-shared';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sort = searchParams.get('sort') === 'mostHelpful' ? 'mostHelpful' : 'mostRecent';

    const { reviews, stats } = await getAppStoreReviews({
      limit: Math.min(limit, 50), // Cap at 50 for client requests
      sort,
    });

    const response: AppStoreReviewsResponse = {
      reviews,
      stats,
      cachedAt: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('App Store reviews API failed:', error);

    if (process.env.NODE_ENV === 'development' && error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: 'Failed to fetch App Store reviews' },
      { status: 500 }
    );
  }
}

// Optional: Support revalidation via POST
export async function POST() {
  try {
    const { reviews, stats } = await getAppStoreReviews({ limit: 50 });
    return NextResponse.json({ reviews, stats, revalidated: true });
  } catch (error) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
