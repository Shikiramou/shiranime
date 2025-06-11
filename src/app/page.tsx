import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { getAnimeResponse } from "./libs/api-libs";

export default async function Home() {
  const nowAnime = await getAnimeResponse("seasons/now", "limit=6", { next: { revalidate: 3600 }})
  const topAnime = await getAnimeResponse("top/anime", "limit=6", { next: { revalidate: 3600 }})
  // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seasons/now?limit=6`, { 
  //     next: { revalidate: 3600 } 
  //   });
  //   const nowAnime = await response.json();
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/top/anime?limit=6`, { 
  //     next: { revalidate: 3600 } 
  //   });
  //   const topAnime = await res.json();

  return ( 
    <>
    
    {/* Ongoing anime */}
    <section className="w-full">
      <Header title="Ongoing anime" linkHref="/Ongoing" linkTitle="View all" />
      <div className="flex flex-col items-center w-full px-4">
        <AnimeList api={nowAnime} />
       {/* Top anime */}
        <Header title="Top anime" linkHref="/Top" linkTitle="View all" />
        <AnimeList api={topAnime} />
      </div>
    </section>
    </>
  )
}