"use client";
import React, { FC, useState } from "react";
import { useParams } from "next/navigation";
import { SideBar } from "@/app-components/sidebar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CanvasComponent from "@/app-components/canvas/canvas";
interface IProps {}

/**
 * @author
 * @function @Practise
 **/

export const Practise: FC<IProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const { questionId } = useParams();
  return (
    <div className="flex">
      <SidebarProvider className="absolute left-0" open={isOpen}>
        <SideBar
          questionId={questionId as string}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <div className="flex-1">
          <CanvasComponent />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Practise;
