'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type {
  AppStoreReviewsResponse,
  AppStoreReview,
} from '@/lib/appstore-shared';

// Star rating component
function StarRating({
  rating,
  size = 'md',
}: {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating
              ? 'fill-[#FA4A8C] text-[#FA4A8C]'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

// Review card component
function ReviewCard({ review }: { review: AppStoreReview }) {
  const formattedDate = new Date(review.createdDate).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 min-h-[300px] flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <StarRating rating={review.rating} size="md" />
          {review.title && (
            <h4 className="text-xl font-bold text-gray-900 mt-3 mb-2">
              {review.title}
            </h4>
          )}
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed flex-1 mb-4">{review.body}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-sm font-medium text-gray-900">
          {review.reviewerNickname}
        </span>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>
    </div>
  );
}


// Main component
export function AppStoreReviews() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [data, setData] = useState<AppStoreReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Fetch reviews
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(
          '/api/appstore/reviews?limit=10&sort=mostRecent'
        );
        if (!res.ok) throw new Error('Failed to fetch reviews');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    }

    if (inView) {
      fetchReviews();
    }
  }, [inView]);

  // Auto-rotate carousel
  useEffect(() => {
    if (!data?.reviews.length || !inView) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % data.reviews.length);
    }, 8000); // 8 seconds per review

    return () => clearInterval(interval);
  }, [data, inView]);

  const paginate = (newDirection: number) => {
    if (!data?.reviews.length) return;

    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex((prev) => (prev + 1) % data.reviews.length);
    } else {
      setCurrentIndex(
        (prev) => (prev - 1 + data.reviews.length) % data.reviews.length
      );
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Don't render section if no ratings and no reviews
  const hasRatings = !loading && data?.stats && data.stats.totalRatings > 0;
  const hasReviews = !loading && data?.reviews && data.reviews.length > 0;

  if (!loading && !error && !hasRatings && !hasReviews) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FA4A8C] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#945AE0] rounded-full blur-3xl" />
      </div>

      <div className="container-content relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FA4A8C] to-[#945AE0] mb-6 shadow-lg"
          >
            <Star className="w-8 h-8 text-white fill-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            Loved by <span className="gradient-brand-text">Users</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what people are saying about Schedulr on the App Store
          </p>
        </motion.div>

        {/* Stats Section */}
        {!loading && data?.stats && data.stats.totalRatings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex flex-col items-center justify-center">
                {/* Average Rating with Gold Stars */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = star <= Math.floor(data.stats.averageRating);
                      const isPartial =
                        star === Math.ceil(data.stats.averageRating) &&
                        data.stats.averageRating % 1 !== 0;

                      return (
                        <Star
                          key={star}
                          className={`w-10 h-10 ${
                            isFilled || isPartial
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-gray-200 text-gray-200'
                          }`}
                        />
                      );
                    })}
                  </div>
                  <p className="text-gray-500 text-sm">
                    {data.stats.totalRatings.toLocaleString()}{' '}
                    {data.stats.totalRatings === 1 ? 'rating' : 'ratings'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reviews Carousel */}
        <div className="max-w-3xl mx-auto">
          {loading && (
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center min-h-[300px] flex items-center justify-center">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
                <div className="h-4 bg-gray-200 rounded w-48 mx-auto" />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 rounded-2xl p-12 border border-red-100 text-center">
              <p className="text-red-600">
                Failed to load reviews. Please try again later.
              </p>
            </div>
          )}

          {!loading && !error && data && data.reviews.length > 0 && (
            <>
              <div className="relative">
                <div className="relative min-h-[300px]">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      className="absolute inset-0"
                    >
                      <ReviewCard review={data.reviews[currentIndex]} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Arrows */}
                {data.reviews.length > 1 && (
                  <>
                    <button
                      onClick={() => paginate(-1)}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors group"
                      aria-label="Previous review"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-[#FA4A8C] transition-colors" />
                    </button>
                    <button
                      onClick={() => paginate(1)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors group"
                      aria-label="Next review"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-[#945AE0] transition-colors" />
                    </button>
                  </>
                )}
              </div>

              {/* Dots Indicator */}
              {data.reviews.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {data.reviews.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }}
                      className="relative"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentIndex ? 'bg-[#FA4A8C]' : 'bg-gray-300'
                        }`}
                      />
                      {index === currentIndex && (
                        <motion.div
                          layoutId="activeReviewDot"
                          className="absolute inset-0 bg-[#FA4A8C] rounded-full"
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
