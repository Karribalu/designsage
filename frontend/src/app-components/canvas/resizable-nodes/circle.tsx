"use client";
import {
  Handle,
  NodeResizer,
  Position,
  ResizeDragEvent,
  ResizeParamsWithDirection,
  Node,
} from "@xyflow/react";
import React, { FC } from "react";
import { ResizableNodeData } from "../../types";
import {
  RESIZABLE_NODE_MIN_HEIGHT,
  RESIZABLE_NODE_MIN_WIDTH,
} from "@/constants";

/**
 * @author
 * @function @ResizableCircle
 **/

export const ResizableCircle: FC<Node<ResizableNodeData>> = ({
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

  const strokeColor = "black";
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
        className="w-full relative"
        style={{ width: data.width, height: data.height }}
      >
        <svg
          width={data.width}
          height={data.height}
          viewBox={`0 0 ${data.width} ${data.height}`}
          className="w-full h-full"
        >
          <ellipse
            cx={data.width / 2}
            cy={data.height / 2}
            rx={data.width / 2 - 2}
            ry={data.height / 2 - 2}
            fill={data.color || "transparent"}
            stroke={strokeColor}
            strokeWidth="2"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <input
            type="text"
            defaultValue={data.label}
            onChange={(e) => {
              data.label = e.target.value;
            }}
            className="bg-transparent border-none text-center focus:outline-none"
            style={{
              fontSize: `${Math.max(data.width / 6, data.height / 6)}px`,
              height: `${Math.max(data.width / 5, data.height / 5)}px`,
              width: "80%",
            }}
          />
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default ResizableCircle;
