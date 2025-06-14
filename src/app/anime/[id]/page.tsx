"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { getAnimeResponse } from "@/libs/api-libs";

const fetcher = (url: string) => getAnimeResponse(url);

export default function Page() {
  const { id } = useParams();
  const { data, error } = useSWR(`anime/${id}`, fetcher);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="px-2 py-3 xl:max-w-5/6 mx-auto xl:bg-[#0f0f0f] xl:border-x xl:border-[rgba(255,255,255,.08)]">
      <div className="relative overflow-hidden pt-[56.25%] rounded-sm">
      <iframe className="w-full h-full top-0 left-0 absolute" src={data?.data?.trailer?.embed_url}  title="YouTube video player"
                 
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen></iframe>
    </div>
    <h2>{data.data.title}<h2></div>
  );
}
