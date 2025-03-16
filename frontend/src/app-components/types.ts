"use client";
import { NodeProps } from "@xyflow/react";

export interface ResizableNodeData extends Record<string, unknown> {
  label: string;
  width: number;
  height: number;
  color: string;
  type: string;
}

export interface ResizableEdgeData extends Record<string, unknown> {
  type: EdgeType;
  color: string;
  style: string;
  label?: string;
  isEditing: boolean;
  setSelected: (selected: boolean) => void;
}
export type EdgeType = "forward" | "backward" | "biDirectional";

export interface IQuestion {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: string;
  categories: string[];
  isBookmarked: boolean;
  status: string;
}
