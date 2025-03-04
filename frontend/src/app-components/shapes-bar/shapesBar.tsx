"use client";
import { useAppDispatch, useAppSelector, useAppStore } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { setSelectedNodeType } from "@/store/canvas/nodeDropReducer";
import {
  Hand,
  MousePointer,
  Square,
  Diamond,
  Circle,
  ArrowRight,
  Minus,
  Pencil,
  Type,
  Image,
  Shapes,
  Cylinder,
} from "lucide-react";
import React, { FC, useEffect } from "react";

interface IProps {}

/**
 * @author
 * @function @ShapesBar
 *
 **/

export const ShapesBar: FC<IProps> = (props) => {
  const { nodeType } = useAppSelector((store) => store.nodeDrop);
  const dispatch = useAppDispatch();
  const handleClick = (shape: string) => {
    console.log("I am clicked ", shape);
    dispatch(setSelectedNodeType(shape));
  };
  return (
    <div className="flex items-center space-x-2 bg-white p-2 shadow-md rounded-lg">
      {/* <Button variant="outline" size="icon">
        {/* <Lock size={20} /> */}
      {/* </Button> */}
      <Button variant="outline" size="icon">
        <Hand size={20} />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="cursor-pointer"
        onClick={() => handleClick("square")}
      >
        <Square size={20} />
      </Button>
      <Button variant="outline" size="icon" className="cursor-pointer">
        <Diamond size={20} />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="cursor-pointer"
        onClick={() => handleClick("circle")}
      >
        <Circle size={20} />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="cursor-pointer"
        onClick={() => handleClick("cylinder")}
      >
        <Cylinder size={20} />
      </Button>
      <Button variant="outline" size="icon" className="cursor-pointer">
        <ArrowRight size={20} />
      </Button>
      <Button variant="outline" size="icon" className="cursor-pointer">
        <Minus size={20} />
      </Button>
      <Button variant="outline" size="icon" className="cursor-pointer">
        <Pencil size={20} />
      </Button>
      <Button variant="outline" size="icon" className="cursor-pointer">
        <Type size={20} />
      </Button>
      <Button variant="outline" size="icon" className="cursor-pointer">
        <Image size={20} />
      </Button>
      <Button variant="outline" size="icon" className="cursor-pointer">
        <Shapes size={20} />
      </Button>
    </div>
  );
};
