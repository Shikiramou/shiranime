"use client";

import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

interface AnimeItem {
  mal_id: number;
  title: string;
  year: number;
  id: number;
  status: string;
  images: {
    webp: {
      image_url: string;
    };
  };
}

export default function Page() {
  const [searchResult, setSearchResults] = useState<AnimeItem[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const fetchResults = useCallback(async (keyword: string, pageNum: number = 1, isLoadMore: boolean = false) => {
    if (!keyword.trim()) {
      setSearchResults([]);
      setHasMore(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/anime?q=${encodeURIComponent(keyword)}&sfw&page=${pageNum}`
      );

      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
      const data = await response.json();
      
      if (isLoadMore) {
        setSearchResults(prev => [...prev, ...(data.data || [])]);
      } else {
        setSearchResults(data.data || []);
      }
      
      // Check if there's more data available
      setHasMore(data.pagination?.has_next_page || false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      if (!isLoadMore) {
        setSearchResults([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle initial search and page changes
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setPage(1); // Reset to first page when query changes
      fetchResults(query, 1, false);
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, fetchResults]);

  // Handle infinite scroll
  useEffect(() => {
    if (!hasMore || isLoading) return;

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchResults(query, nextPage, true);
      }
    }, options);

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [query, page, hasMore, isLoading, fetchResults]);

  return (
    <div className="xl:max-w-6/5 mt-6 mx-auto px-4">
      <Header title="Search page" linkHref="" linkTitle=""/>
      <div className="relative flex items-center max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search anime..."
          className="bg-[rgba(255,255,255,.1)] py-2 px-5 w-full h-12 focus:outline-none rounded-l-md text-white placeholder-gray-300"
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search anime"
        />
        <button
          className={`bg-[#ece48b] h-12 px-5 rounded-r-md hover:bg-[#e0d874] transition-colors duration-200 flex items-center justify-center ${
            isLoading ? "pointer-events-none opacity-75" : ""
          }`}
          disabled={isLoading}
          aria-label="Search button"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-5 h-5 text-[#0a0909]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 text-red-400 text-center">
          {error}
        </div>
      )}

      {isLoading && !error && page === 1 && (
        <div className="mt-8 text-center text-gray-300">
          Searching...
        </div>
      )}

      <div className="mt-8">
        {searchResult.length > 0 ? (
          <>
            <AnimeList api={{ data: searchResult }} />
            <div ref={loadMoreRef} className="h-10">
              {isLoading && page > 1 && (
                <div className="text-center py-4 text-gray-400">
                  Loading more...
                </div>
              )}
              {!hasMore && searchResult.length > 0 && (
                <div className="text-center py-4 text-gray-400">
                  No more results
                </div>
              )}
            </div>
          </>
        ) : (
          !isLoading && (
            <div className="text-center py-10 text-gray-400">
              {query ? "No results found" : "Type to search anime"}
            </div>
          )
        )}
      </div>
    </div>
  );
}
