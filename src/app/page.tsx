"use client";
import { Canvas, Rect, Circle } from "fabric";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { colors, IconButton } from "@mui/material"; // MUI IconButton alternative
import SquareIcon from "@mui/icons-material/SquareOutlined"; // MUI SquareIcon alternative
import CircleIcon from "@mui/icons-material/CircleOutlined"; // MUI SquareIcon alternative
import Settings from "../components/Settings"
import Video from "../components/Video"


export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });
      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();
      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  const addRectangle = () => {
    if (canvas) {
      const rect = new Rect({
        top: 100,
        left: 50,
        width: 100,
        height: 60,
        fill: "green",
      });
      canvas.add(rect);
    }
  };

  const addCircle = () => {
    if (canvas) {
      const circle = new Circle({
        top: 150,
        left: 150,
        radius: 50,
        fill: "red",
      });
      canvas.add(circle);
    }
  };


  return (
    <div className="App">
      <div className="Toolbar darkmode">
        <IconButton onClick={addRectangle} color="primary">
          <SquareIcon sx={{color:'white'}} />
        </IconButton>
        <IconButton onClick={addCircle} color="primary">
          <CircleIcon sx={{color:'white'}}/>
        </IconButton>
      <Video canvas={canvas} canvasRef={canvasRef}/>
      </div>
      <canvas id="canvas" ref={canvasRef} />
      <Settings canvas={canvas}/>

    </div>
  );
}
