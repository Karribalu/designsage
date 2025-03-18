"use client";
import { Button } from "@/components/ui/button";
import { Mic, Captions, Phone, MessageSquareMore } from "lucide-react";
import React, { FC, useState, useEffect } from "react";

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
  // Format time as hours:minutes
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <div
      className={`flex items-center justify-between ${props.className} bg-gray-900 text-white p-2`}
    >
      <div>
        {/* Left */}
        <span>{`${hours}:${minutes}`}</span>
        <span>&nbsp;|&nbsp;</span>
        <span>{props.questionName}</span>
      </div>
      <div className="flex items-center gap-2">
        {/* Middle */}
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
      <div></div>
    </div>
  );
};

export default CommunicationToolbar;
