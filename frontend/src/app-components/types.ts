"use client";
import { NodeProps } from "@xyflow/react";

export interface ResizableNodeProps extends NodeProps {
  data: {
    label: string;
    width: number;
    height: number;
    color: string;
  };
}
