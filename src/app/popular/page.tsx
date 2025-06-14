"use client";

import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { getAnimeResponse } from "../../libs/api-libs";

interface AnimeItem {
  mal_id: number;
  title: string;
  year: number;
  id: number;
  images: {
    webp: {
      image_url: string;
    };
  };
}

export default function Page() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const fetchNowAnime = async (pageNum: number) => {
    setIsLoading(true);

    try {
      const data = await getAnimeResponse(
        "top/anime", 
        `page=${pageNum}&sfw&filter=bypopularity`, 
        { next: { revalidate: 3600 } }
      );
      
      setAnimeList(prev => [...prev, ...(data.data || [])]);
      setHasMore(data.pagination?.has_next_page || false);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchNowAnime(1);
  }, []);

  // Infinite scroll setup
  useEffect(() => {
    if (!hasMore || isLoading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchNowAnime(nextPage);
        }
      },
      { root: null, rootMargin: "20px", threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [page, hasMore, isLoading]);

  return (
    <>
      <Header title="All time popular" linkHref="" linkTitle="" />
      <div className="xl:max-w-6/5 mt-2 mx-auto px-4">
        {isLoading && animeList.length === 0 ? (
          <div className="mt-8 text-center text-gray-300">
            Loading all time popular...
          </div>
        ) : (
          <>
            <AnimeList api={{ data: animeList }} />
            <div ref={loadMoreRef} className="h-10">
              {isLoading && (
                <div className="text-center py-4 text-gray-400">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full inline-block"
                  />
                </div>
              )}
              {!hasMore && animeList.length > 0 && (
                <div className="text-center text-gray-400">
                  No more all time popular
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}