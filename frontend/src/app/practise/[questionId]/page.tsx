"use client";
import React, { FC, useState } from "react";
import { useParams } from "next/navigation";
import { SideBar } from "@/app-components/sidebar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CanvasComponent from "@/app-components/canvas/canvas";
import { CommunicationToolbar } from "@/app-components/communication-toolbar/communication-toolbar";
import questions from "@/lib/mocks/mock-questions.json";

interface IProps {}

/**
 * @author
 * @function @Practise
 **/

export const Practise: FC<IProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const { questionId } = useParams();
  const question = questions.find(
    (question) => question.id === parseInt(questionId as string)
  );

  return (
    <div className="flex">
      <SidebarProvider className="absolute left-0" open={isOpen}>
        <SideBar
          questionId={questionId as string}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <div className="flex flex-col w-full">
          <CanvasComponent />
          <CommunicationToolbar questionName={question?.title} />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Practise;
