"use client";
import { Handle, NodeResizer, Position } from "@xyflow/react";
import React, { FC, useEffect } from "react";
import { ResizableNodeProps } from "../types";

/**
 * @author
 * @function @ResizableCircle
 **/

export const ResizableCircle: FC<ResizableNodeProps> = ({ selected, data }) => {
  useEffect(() => {
    console.log("data ", data);
  }, []);
  return (
    <>
      <NodeResizer
        color="blue"
        isVisible={selected}
        minWidth={data.width}
        minHeight={data.height}
      />
      <Handle type="target" position={Position.Left} />
      <div
        style={{
          width: "100%",
          height: "100%",
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
