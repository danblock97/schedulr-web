import 'server-only';
import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';
import type {
  AppStoreReview,
  AppStoreStats,
  AppStoreConnectAPIResponse,
  CustomerReview,
} from './appstore-shared';

// Environment variable helpers
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function optionalEnv(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

// Configuration
const APPSTORE_API_KEY_ID = requireEnv('APPSTORE_API_KEY_ID');
const APPSTORE_ISSUER_ID = requireEnv('APPSTORE_ISSUER_ID');
const APPSTORE_APP_ID = requireEnv('APPSTORE_APP_ID');
const APPSTORE_CACHE_TTL = parseInt(optionalEnv('APPSTORE_CACHE_TTL', '3600'), 10);

// Load private key
function getPrivateKey(): string {
  // Option 1: Load from file
  const keyFile = process.env.APPSTORE_API_PRIVATE_KEY_FILE;
  if (keyFile) {
    try {
      return readFileSync(keyFile, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to read private key file: ${keyFile}`);
    }
  }

  // Option 2: Use direct key content
  const keyContent = process.env.APPSTORE_API_PRIVATE_KEY;
  if (keyContent) {
    return keyContent.replace(/\\n/g, '\n');
  }

  throw new Error(
    'Missing APPSTORE_API_PRIVATE_KEY_FILE or APPSTORE_API_PRIVATE_KEY env var'
  );
}

// JWT token generation
function generateJWT(): string {
  const privateKey = getPrivateKey();
  const now = Math.floor(Date.now() / 1000);

  // Token expires in 20 minutes (maximum allowed by Apple)
  const expiresIn = 20 * 60; // 1200 seconds

  const token = sign(
    {
      iss: APPSTORE_ISSUER_ID,
      exp: now + expiresIn,
      aud: 'appstoreconnect-v1',
    },
    privateKey,
    {
      algorithm: 'ES256',
      header: {
        alg: 'ES256',
        kid: APPSTORE_API_KEY_ID,
        typ: 'JWT',
      },
    }
  );

  return token;
}

// API request wrapper
async function appStoreConnectRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = generateJWT();
  const url = `https://api.appstoreconnect.apple.com${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    next: {
      revalidate: APPSTORE_CACHE_TTL, // Next.js cache
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `App Store Connect API error ${res.status}: ${text || res.statusText}`
    );
  }

  return res.json();
}

// Transform raw API review to our format
function transformReview(review: CustomerReview): AppStoreReview {
  const attrs = review.attributes;
  return {
    id: review.id,
    rating: attrs.rating,
    title: attrs.title || null,
    body: attrs.body,
    reviewerNickname: attrs.reviewerNickname,
    createdDate: attrs.createdDate,
    territory: attrs.territory,
  };
}

// Calculate statistics from reviews
function calculateStats(reviews: AppStoreReview[]): AppStoreStats {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalRating = 0;
  let totalRatings = 0;

  reviews.forEach((review) => {
    const rating = review.rating as 1 | 2 | 3 | 4 | 5;
    if (rating >= 1 && rating <= 5) {
      distribution[rating]++;
      totalRating += rating;
      totalRatings++;
    }
  });

  const averageRating = totalRatings > 0 ? totalRating / totalRatings : 0;

  return {
    averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    totalRatings,
    ratingDistribution: distribution,
  };
}

// Public API: Fetch reviews
// Note: Apple's App Store Connect API only returns written reviews with text
// Star-only ratings (without review text) are not accessible via API
export async function getAppStoreReviews(options?: {
  limit?: number;
  sort?: 'mostRecent' | 'mostHelpful';
}): Promise<{ reviews: AppStoreReview[]; stats: AppStoreStats }> {
  const limit = Math.min(options?.limit || 50, 200); // Max 200 per request
  const sort = options?.sort === 'mostHelpful' ? '-rating' : '-createdDate';

  try {
    const response = await appStoreConnectRequest<
      AppStoreConnectAPIResponse<CustomerReview>
    >(`/v1/apps/${APPSTORE_APP_ID}/customerReviews?limit=${limit}&sort=${sort}`);

    const reviews = response.data.map(transformReview);
    const stats = calculateStats(reviews);

    return { reviews, stats };
  } catch (error) {
    console.error('Failed to fetch App Store reviews:', error);
    throw error;
  }
}

// Public API: Fetch all reviews with pagination
export async function getAllAppStoreReviews(
  maxReviews: number = 500
): Promise<{ reviews: AppStoreReview[]; stats: AppStoreStats }> {
  const allReviews: AppStoreReview[] = [];
  let nextUrl: string | undefined = `/v1/apps/${APPSTORE_APP_ID}/customerReviews?limit=200&sort=-createdDate`;

  try {
    while (nextUrl && allReviews.length < maxReviews) {
      const response: AppStoreConnectAPIResponse<CustomerReview> =
        await appStoreConnectRequest<AppStoreConnectAPIResponse<CustomerReview>>(
          nextUrl
        );

      const reviews = response.data.map(transformReview);
      allReviews.push(...reviews);

      // Check for next page
      nextUrl = response.links?.next;

      // Respect the max limit
      if (allReviews.length >= maxReviews) {
        break;
      }
    }

    const stats = calculateStats(allReviews);
    return { reviews: allReviews, stats };
  } catch (error) {
    console.error('Failed to fetch all App Store reviews:', error);
    throw error;
  }
}
