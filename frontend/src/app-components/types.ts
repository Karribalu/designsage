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
  type: string;
  color: string;
  style: string;
  label: string;
  isEditing: boolean;
}
