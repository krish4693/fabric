import React from "react";
import { VideoProps } from "@/app/@types/video";

const Video:React.FC<VideoProps> = ({canvas,canvasRef}) => {
    //STORES THE VIDEO SRC URL
    const [videoSrc,setVideoSrc] = React.useState<string>("");
    //STORES FABRIC JS IMAGE OBJECT
    const [fabricVideo,setFabricVideo] = React.useState<any>(null);
    //Recording chunks for video accumilation
    const [recordingChunks,setRecordingChunks] = React.useState<any>([]);
    
    const [isRecording,setIsRecording] = React.useState<boolean>(false);

    const [loadedPercentage,setLoadedPercentage] = React.useState<number>(0);

    return <>Video</>
}

export default Video