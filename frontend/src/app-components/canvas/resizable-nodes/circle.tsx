"use client";
import {
  Handle,
  NodeResizer,
  Position,
  ResizeDragEvent,
  ResizeParamsWithDirection,
  Node,
} from "@xyflow/react";
import React, { FC, useEffect } from "react";
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
  const padding = 3;
  const viewBoxWidth = data.width + padding;
  const viewBoxHeight = data.height + padding;
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
      <div className="w-full">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full "
        >
          <ellipse
            cx={viewBoxWidth / 2}
            cy={viewBoxHeight / 2}
            rx={data.width / 2}
            ry={data.height / 2}
            fill={data.color}
            stroke={strokeColor}
            strokeWidth="1"
          />

          <text
            x={viewBoxWidth / 2}
            y={viewBoxHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={"black"}
            fontWeight="bold"
            fontSize={Math.min(data.width, data.height) / 6}
          >
            {data.label}
          </text>
        </svg>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default ResizableCircle;
