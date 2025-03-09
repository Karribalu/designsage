"use client";
import React, { FC, useEffect } from "react";
import { ResizableNodeData } from "../../types";
import {
  Handle,
  NodeResizer,
  Position,
  Node,
  ResizeDragEvent,
  ResizeParamsWithDirection,
} from "@xyflow/react";
import {
  RESIZABLE_NODE_MIN_HEIGHT,
  RESIZABLE_NODE_MIN_WIDTH,
} from "@/constants";

/**
 * @author
 * @function @Square
 **/

export const ResizableSquare: FC<Node<ResizableNodeData>> = ({
  selected,
  data,
}) => {
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
        minWidth={RESIZABLE_NODE_MIN_WIDTH}
        minHeight={RESIZABLE_NODE_MIN_HEIGHT}
        onResize={handleOnResize}
      />
      <Handle type="target" position={Position.Left} />
      <div
        style={{
          width: data.width,
          height: data.height,
          backgroundColor: data.color || "rgba(0, 0, 255, 0.5)",
          border: "2px solid #555",
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

export default ResizableSquare;
