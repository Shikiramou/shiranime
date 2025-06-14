// app/anime/[id]/page.tsx
import { getAnimeResponse } from "@/libs/api-libs";

// Perbaikan: Gunakan Promise untuk params
interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getAnimeResponse(`anime/${resolvedParams.id}`);

  return (
    <div className="px-2 py-3 xl:max-w-5/6 mx-auto xl:bg-[#0f0f0f] xl:border-x xl:border-[rgba(255,255,255,.08)]">
      <div className="relative overflow-hidden pt-[56.25%] rounded-sm">
        <iframe
          className="w-full h-full top-0 left-0 absolute"
          src={data.data.trailer.embed_url}
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
