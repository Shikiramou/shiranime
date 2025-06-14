"use client";

import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getAnimeResponse } from "../../libs/api-libs";
import { FaArrowUp } from "react-icons/fa";

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

export default function SearchPage() {
  // State management
  const [searchResult, setSearchResults] = useState<AnimeItem[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Load saved results from sessionStorage
  useEffect(() => {
    const savedState = sessionStorage.getItem('animeSearchState');
    if (savedState) {
      const { results } = JSON.parse(savedState);
      setSearchResults(results || []);
    }

    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch anime data
  const fetchResults = async (keyword: string) => {
    if (!keyword.trim()) {
      setSearchResults([]);
      // Clear saved results when search is empty
      sessionStorage.removeItem('animeSearchState');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getAnimeResponse(
        "anime", 
        `q=${encodeURIComponent(keyword)}&sfw&page=1`,
        { next: { revalidate: 3600 }}
      );

      const results = data.data || [];
      setSearchResults(results);

      // Save only the results (without query)
      sessionStorage.setItem('animeSearchState', JSON.stringify({
        results
      }));
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search submission
  const handleSearch = () => {
    if (query.trim()) {
      fetchResults(query);
      // Clear the input after search
      setQuery("");
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="mt-4">
        <Header title="Search Anime" linkHref="" linkTitle="" />
      </div>
      <div className="xl:max-w-6/5 mx-auto px-4 pb-6 relative min-h-screen">
        {/* Search Input */}
        <div className="flex items-center w-full xl:max-w-3/6 mx-auto mb-8">
          <input
            type="text"
            placeholder="Search anime..."
            className="flex-1 bg-gray-800 text-white p-3 rounded-l-lg focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search anime"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-3 rounded-r-lg transition-colors disabled:opacity-70"
            aria-label="Search"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
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

        {/* Error Message */}
        {error && (
          <div className="text-red-400 text-center py-4">
            Error: {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8 text-gray-400">
            Searching...
          </div>
        )}

        {/* Search Results */}
        <div className="mt-4">
          {searchResult.length > 0 ? (
            <>
              <AnimeList api={{ data: searchResult }} />
              <div className="text-center text-gray-400 mt-4">
                Showing {searchResult.length} results
              </div>
            </>
          ) : null}
        </div>

        {/* Empty State */}
        {!isLoading && searchResult.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            {query ? null : "Search for your favorite anime"}
          </div>
        )}

        {/* Back to Top Button */}
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed z-50 bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-3 rounded-full shadow-lg transition-all cursor-pointer"
            aria-label="Back to top"
          >
            <FaArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  );
}