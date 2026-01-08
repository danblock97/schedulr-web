// Shared types for App Store Connect API
// Can be used on both server and client

export type AppStoreReview = {
  id: string;
  rating: number; // 1-5
  title: string | null;
  body: string;
  reviewerNickname: string;
  createdDate: string; // ISO date
  territory: string; // e.g., "USA"
};

export type AppStoreStats = {
  averageRating: number; // Calculated from reviews
  totalRatings: number; // Count of reviews with ratings
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  totalDownloads?: number; // Optional, may not be available
};

export type AppStoreReviewsResponse = {
  reviews: AppStoreReview[];
  stats: AppStoreStats;
  cachedAt: string; // ISO timestamp
};

// Raw API response types (internal use)
export type AppStoreConnectAPIResponse<T> = {
  data: T[];
  links?: {
    self: string;
    next?: string;
  };
  meta?: {
    paging?: {
      total: number;
      limit: number;
    };
  };
};

export type CustomerReviewAttributes = {
  rating: number;
  title?: string;
  body: string;
  reviewerNickname: string;
  createdDate: string;
  territory: string;
};

export type CustomerReview = {
  id: string;
  type: 'customerReviews';
  attributes: CustomerReviewAttributes;
};
