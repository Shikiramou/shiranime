import AnimePlayer from "@/components/AnimePlayer";

<<<<<<< HEAD
export default function AnimeTrailerPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(`anime/${id}`, fetcher);

  // Error states
  if (error) return <div className="text-red-500 p-4">Failed to load anime data</div>;
  if (isLoading) return <div className="p-4">Loading anime data...</div>;
  if (!data) return <div className="p-4">No anime data found</div>;

  // Safely access trailer data
  const trailerUrl = data?.data?.trailer?.embed_url || null;

  if (!trailerUrl) {
    return (
      <div className="p-4 text-center">
        <p>Trailer is not available for this anime</p>
        <p className="text-sm text-gray-500 mt-2">
          Try checking the anime page for alternative video sources
        </p>
      </div>
    );
  }

  // Validate YouTube URL
  const isValidYoutubeUrl = trailerUrl.includes('youtube.com') || trailerUrl.includes('youtu.be');
  if (!isValidYoutubeUrl) {
    console.error('Invalid trailer URL:', trailerUrl);
    return (
      <div className="p-4 text-center text-yellow-500">
        Trailer source is not supported
      </div>
    );
  }

  return (
    <div className="px-2 py-3 xl:max-w-5/6 mx-auto xl:bg-[#0f0f0f] xl:border-x xl:border-[rgba(255,255,255,.08)]">
      <div className="relative overflow-hidden pt-[56.25%] rounded-sm">
        <iframe 
          className="w-full h-full top-0 left-0 absolute" 
          src={trailerUrl}
          title={`${data.data.title || 'Anime'} Trailer`}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onError={(e) => {
            console.error('Iframe load error:', e);
            // You can add error state handling here
          }}
        />
      </div>
    </div>
  );
}
=======
export default function Page() {
  return (
    <AnimePlayer />
  )
}
>>>>>>> a394255 (a)
