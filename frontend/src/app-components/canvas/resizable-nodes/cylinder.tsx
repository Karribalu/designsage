"use client";
import React, { FC, useEffect } from "react";
import { ResizableNodeData } from "../../types";
import {
  Handle,
  NodeResizer,
  Position,
  ResizeDragEvent,
  ResizeParamsWithDirection,
  Node,
} from "@xyflow/react";
import {
  RESIZABLE_CYLINDER_NODE_MIN_HEIGHT,
  RESIZABLE_CYLINDER_NODE_MIN_WIDTH,
  RESIZABLE_NODE_MIN_HEIGHT,
  RESIZABLE_NODE_MIN_WIDTH,
} from "@/constants";

/**
 * @author
 * @function @Square
 **/

export const ResizableCylinder: FC<Node<ResizableNodeData>> = ({
  selected,
  data,
}) => {
  const ellipseHeight = data.width / 8;

  // The viewBox should match the actual size plus the top and bottom ellipses
  const viewBoxHeight = data.height + ellipseHeight * 2;
  const strokeColor = "black";
  return (
    <div className="relative">
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={RESIZABLE_CYLINDER_NODE_MIN_HEIGHT + ellipseHeight * 2}
        minHeight={RESIZABLE_CYLINDER_NODE_MIN_HEIGHT + ellipseHeight * 2}
        onResize={(_, params) => {
          // Update the node dimensions in data
          data.width = params.width;
          data.height = params.height;
        }}
      />

      <svg
        width={data.width}
        height={viewBoxHeight}
        viewBox={`0 0 ${data.width} ${viewBoxHeight}`}
        style={{ overflow: "visible" }}
      >
        <g>
          {/* Cylinder body */}
          <rect
            x="0"
            y={ellipseHeight}
            width={data.width}
            height={data.height}
            fill={data.color}
            stroke={strokeColor}
            strokeWidth="2"
          />

          {/* Cylinder top ellipse */}
          <ellipse
            cx={data.width / 2}
            cy={ellipseHeight}
            rx={data.width / 2}
            ry={ellipseHeight}
            fill={data.color}
            stroke={strokeColor}
            strokeWidth="2"
          />

          {/* Cylinder bottom ellipse */}
          <ellipse
            cx={data.width / 2}
            cy={data.height + ellipseHeight}
            rx={data.width / 2}
            ry={ellipseHeight}
            fill={data.color || "transparent"}
            stroke={strokeColor}
            strokeWidth="2"
          />

          {/* Cylinder Text */}
        </g>
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
            // fontSize: `${Math.max(data.width / 6, data.height / 6)}px`,
            // height: `${Math.max(data.width / 5, data.height / 5)}px`,
            width: "80%",
          }}
        />
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default ResizableCylinder;
