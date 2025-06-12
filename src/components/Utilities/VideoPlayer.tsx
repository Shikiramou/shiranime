"use client"

import YouTube from "react-youtube"

interface VideoPlayerProps {
  youtubeId: string;
}

const VideoPlayer = ({ youtubeId }: VideoPlayerProps) => {
    const options = {
        width: "350",
        height: "250"
    }
    
    return (
        <div className="flex justify-center">
            <YouTube 
                videoId={youtubeId} 
                onReady={(event) => event.target.pauseVideo()} 
                opts={options} 
            />
        </div>
    )
}

export default VideoPlayer