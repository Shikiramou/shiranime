import { getAnimeResponse } from "@/app/libs/api-libs"

interface PageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageProps) {
  
  const { id } = await params
  
  // Kemudian gunakan id untuk fetch data
  const response = await getAnimeResponse(`anime/${id}`)
  const anime = response.data
  return (
    <>
      <div>{anime.title}</div>
    </>
  )
}