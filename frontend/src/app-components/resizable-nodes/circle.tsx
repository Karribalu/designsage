"use client";
import {
  Handle,
  NodeResizer,
  Position,
  ResizeDragEvent,
  ResizeParamsWithDirection,
} from "@xyflow/react";
import React, { FC, useEffect } from "react";
import { ResizableNodeProps } from "../types";
import {
  RESIZABLE_NODE_MIN_HEIGHT,
  RESIZABLE_NODE_MIN_WIDTH,
} from "@/constants";

/**
 * @author
 * @function @ResizableCircle
 **/

export const ResizableCircle: FC<ResizableNodeProps> = ({ selected, data }) => {
  useEffect(() => {
    console.log("data ", data);
  }, []);
  const handleOnResize = (
    _: ResizeDragEvent,
    params: ResizeParamsWithDirection
  ) => {
    data.height = params.height;
    data.width = params.width;
  };
  return (
    <>
      <NodeResizer
        color="blue"
        isVisible={selected}
        onResize={handleOnResize}
        minWidth={RESIZABLE_NODE_MIN_WIDTH}
        minHeight={RESIZABLE_NODE_MIN_HEIGHT}
      />
      <Handle type="target" position={Position.Left} />
      <div
        style={{
          width: data.width,
          height: data.height,
          borderRadius: "50%",
          backgroundColor: data.color || "rgba(255, 0, 0, 0.5)",
          border: selected ? "2px solid #555" : "1px solid #222",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.label}
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default ResizableCircle;
