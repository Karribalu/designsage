"use client";
import React, { FC, useEffect } from "react";
import { ResizableNodeProps } from "../types";
import {
  Handle,
  NodeResizer,
  Position,
  ResizeDragEvent,
  ResizeParamsWithDirection,
} from "@xyflow/react";
import {
  RESIZABLE_CYLINDER_NODE_MIN_WIDTH,
  RESIZABLE_NODE_MIN_HEIGHT,
  RESIZABLE_NODE_MIN_WIDTH,
} from "@/constants";

/**
 * @author
 * @function @Square
 **/

export const ResizableCylinder: FC<ResizableNodeProps> = ({
  selected,
  data,
}) => {
  // let { height, width } = data;
  useEffect(() => {
    console.log("square data ", data);
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
        color="red"
        isVisible={selected}
        // minWidth={RESIZABLE_NODE_MIN_WIDTH}
        // minHeight={RESIZABLE_CYLINDER_NODE_MIN_WIDTH}
        // minWidth={300}
        // minHeight={300}
        minWidth={data.width + 0.5 * data.width}
        minHeight={data.height + 0.7 * data.height}
        onResize={handleOnResize}
      />

      <Handle type="target" position={Position.Left} />

      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default ResizableCylinder;
