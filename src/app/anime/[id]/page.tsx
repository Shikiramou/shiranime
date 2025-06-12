import { getAnimeResponse } from "@/app/libs/api-libs";
import VideoPlayer from "@/components/Utilities/VideoPlayer";



export default async function Page({ params }: any) {
 
  const response = await getAnimeResponse(`anime/${params.id}`);
  
 
  return (
    <>
    
      
        <VideoPlayer youtubeId={response?.data.trailer.youtube_id} />
      
    </>
  );
}