"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React, { FC, useState, useEffect } from "react";
import { IQuestion } from "@/app-components/types";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
interface IProps {
  style?: React.CSSProperties;
  questionId?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * @author
 * @function @SideBar
 **/
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
export const SideBar: FC<IProps> = (props) => {
  const { isOpen, setIsOpen } = props;
  const { questionId }: { questionId: string } = useParams();
  const [question, setQuestion] = useState<IQuestion | null>(null);
  useEffect(() => {
    console.log("some", question);
  }, [question]);
  useEffect(() => {
    const questions = require("@/lib/mocks/mock-questions.json");
    console.log(questions);
    for (const q of questions) {
      console.log("some", q.id, questionId, typeof questionId);
      if (q.id === parseInt(questionId)) {
        console.log("some inside", q);
        setQuestion(q);
      }
    }
    // console.log(q);
  }, []);

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="top-16 pb-15 h-full"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{question?.title}</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto"
          >
            {isOpen ? <ChevronsLeft size={32} /> : <ChevronsRight size={32} />}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
