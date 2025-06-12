import { getAnimeResponse } from "@/app/libs/api-libs";

// Interface yang kompatibel dengan tipe Next.js
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  // Await the Promise to get params
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Fetch data
  const response = await getAnimeResponse(`anime/${id}`);
  const anime = response.data;

  return (
    <>
      <div>{anime.title}</div>
    </>
  );
}