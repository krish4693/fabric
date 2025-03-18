"use client";
import { Canvas,Rect } from "fabric";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { IconButton } from "@mui/material"; // MUI IconButton alternative
import SquareIcon from "@mui/icons-material/Square"; // MUI SquareIcon alternative

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
    if (canvas){
    const rect = new Rect({
    top: 100,
    left: 50,
    width: 100,
    height: 60,
    fill: "#084D42",
    });
    canvas.add(rect);
    }
    };

  return (
    <div className="App">
      <div className="Toolbar darkmode">
        <IconButton onClick={addRectangle} color="primary">
          <SquareIcon />
        </IconButton>
      </div>
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
}
