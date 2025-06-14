import { getAnimeResponse } from "@/app/libs/api-libs";

export default async function Page({ params }: any ) {
  const { id } = await params
  const data = await getAnimeResponse(`anime/${id}`);
  return <div>{data.data.title}</div>;
}