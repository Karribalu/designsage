"use client";
import React, { FC, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { IQuestion } from "@/app-components/types";
interface IProps {}

/**
 * @author
 * @function @Questions
 **/

const difficultyColors = {
  Easy: "bg-green-100",
  Medium: "bg-yellow-100",
  Hard: "bg-red-100",
};

export const Questions: FC<IProps> = (props) => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const router = useRouter();
  useEffect(() => {
    const questions = require("@/lib/mocks/mock-questions.json");
    setQuestions(questions);
    console.log(questions);
  }, []);
  return (
    <div className="flex flex-col gap-2 pt-10">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">System Design Questions</h1>
          <span className="text-sm text-gray-500">
            Browse our collection of high-level system design questions to
            practice our interactive workspace.
          </span>
        </div>
        <div>
          {/* Filter bar */}
          <Input placeholder="Search questions by keyword, topic or tag..." />
        </div>
      </div>
      <div>{/* Questions Sections */}</div>
      <div>{/*Questions tags*/}</div>
      <div className="grid grid-cols-3 gap-4">
        {/* Questions Cards */}
        {questions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <div className="flex justify-between w-full">
                <Badge
                  key={question.difficulty}
                  variant="outline"
                  className={
                    difficultyColors[
                      question.difficulty as keyof typeof difficultyColors
                    ]
                  }
                >
                  {question.difficulty}
                </Badge>
                <div className="cursor-pointer flex items-center gap-1">
                  {question.status === "Attempted" && (
                    <Badge
                      key={question.status}
                      variant="outline"
                      className="bg-green-100 "
                    >
                      <div className="flex items-center gap-1">
                        <Check size={12} />
                        <p className="text-xs">Attempted</p>
                      </div>
                    </Badge>
                  )}
                  <Bookmark
                    size={20}
                    fill={question.isBookmarked ? "black" : "none"}
                  />
                </div>
              </div>
              <CardTitle className="text-sm font-bold">
                {question.title}
              </CardTitle>
              <CardDescription>{question.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                {question.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
                <Button
                  size="sm"
                  className="text-xs cursor-pointer"
                  onClick={() => {
                    router.push(`/practise/${question.id}`);
                  }}
                >
                  Practise Now
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Questions;
