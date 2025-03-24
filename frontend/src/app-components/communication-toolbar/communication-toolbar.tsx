"use client";
import { Button } from "@/components/ui/button";
import { Mic, Captions, Phone, MessageSquareMore, Minus } from "lucide-react";
import React, { FC, useState, useEffect, useRef } from "react";

interface IProps {
  className?: string;
  questionName?: string;
  handleCallEnd?: () => void;
  audioSrc?: string | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
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
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

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
    if (props.audioRef?.current && props.audioSrc) {
      const audio = props.audioRef.current;
      audio.src = props.audioSrc;
      audio.play();

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audio);

      source.connect(analyser);
      analyser.connect(audioContext.destination);

      analyser.fftSize = 128;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
    }

    return () => {
      audioContextRef.current?.close();
    };
  }, [props.audioSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !analyserRef.current || !dataArrayRef.current)
      return;

    const drawWaveform = () => {
      if (dataArrayRef.current === null || analyserRef.current === null) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 50;
      const bars = dataArrayRef.current.length;

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      for (let i = 0; i < bars; i++) {
        const angle = (i / bars) * Math.PI * 2;
        const barHeight = dataArrayRef.current[i] / 2; // Scale audio data
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

      requestAnimationFrame(drawWaveform);
    };

    drawWaveform();
  }, [props.audioSrc]);

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
        <audio ref={props.audioRef} hidden autoPlay />
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
          onClick={props.handleCallEnd}
        >
          <Phone />
        </Button>
      </div>
      {isMinimized && (
        <Button
          size="icon"
          className="p-4 text-white cursor-pointer w-full hover:bg-gray-600"
          onClick={() => setIsMinimized(false)}
        >
          Expand
        </Button>
      )}
    </div>
  );
};

export default CommunicationToolbar;
