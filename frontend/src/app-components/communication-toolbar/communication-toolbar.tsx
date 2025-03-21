"use client";
import { Button } from "@/components/ui/button";
import { Mic, Captions, Phone, MessageSquareMore, Minus } from "lucide-react";
import React, { FC, useState, useEffect, useRef } from "react";

interface IProps {
  className?: string;
  questionName?: string;
}

/**
 * @author
 * @function @CommunicationToolbar
 **/

export const CommunicationToolbar: FC<IProps> = (props) => {
  const [time, setTime] = useState(new Date());
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: 100,
  });
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up interval on component unmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const drawWaveform = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 50;
      const bars = 64;

      for (let i = 0; i < bars; i++) {
        const angle = (i / bars) * Math.PI * 2;
        const barHeight = Math.random() * 30 + 20; // Simulate audio levels
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const animation = setInterval(drawWaveform, 100); // Update every 100ms

    return () => {
      clearInterval(animation);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Format time as hours:minutes
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <div
      className={`${
        isMinimized
          ? "fixed bottom-4 right-4"
          : "fixed bg-gray-900 text-white p-4 rounded-lg shadow-lg cursor-move"
      } ${props.className}`}
      style={{
        top: isMinimized ? "auto" : `${position.y}px`,
        left: isMinimized ? "auto" : `${position.x}px`,
        transform: isMinimized ? "none" : "translate(-50%, 0)",
      }}
      onMouseDown={!isMinimized ? handleMouseDown : undefined}
    >
      {!isMinimized && (
        <div className="flex items-center justify-between gap-4">
          <div>
            {/* Left */}
            <span>{`${hours}:${minutes}`}</span>
            <span>&nbsp;|&nbsp;</span>
            <span>{props.questionName}</span>
          </div>
          <Button
            size="icon"
            className="bg-gray-700 text-white cursor-pointer hover:bg-gray-600"
            onClick={() => setIsMinimized(true)}
          >
            <Minus size={16} />
          </Button>
        </div>
      )}
      <div className={`flex items-center gap-2 ${isMinimized ? "hidden" : ""}`}>
        {/* Middle */}
        <canvas
          ref={canvasRef}
          width={150}
          height={150}
          className="rounded-full bg-gray-800"
        />
        <Button
          size="icon"
          className="bg-gray-700 text-white cursor-pointer hover:bg-gray-600"
        >
          <Mic color="white" />
        </Button>
        <Button
          size="icon"
          className="bg-gray-700 text-white cursor-pointer hover:bg-gray-600"
        >
          <Captions size={20} />
        </Button>
        <Button
          size="icon"
          className="bg-gray-700 text-white cursor-pointer hover:bg-gray-600"
        >
          <MessageSquareMore />
        </Button>
        <Button
          size="icon"
          className="bg-red-600 text-white cursor-pointer hover:bg-red-500"
        >
          <Phone />
        </Button>
      </div>
      {isMinimized && (
        <Button
          size="icon"
          className=" p-4 text-white cursor-pointe w-full hover:bg-gray-600 cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          Expand
        </Button>
      )}
    </div>
  );
};

export default CommunicationToolbar;
