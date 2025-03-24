import { Canvas } from "fabric";

export interface VideoProps{
    canvas:Canvas | null;
    canvasRef:React.RefObject<HTMLCanvasElement | nulll>;
}