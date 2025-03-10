import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
} from "@xyflow/react";
import React, { FC, useState } from "react";
import { ResizableEdgeData } from "../../types";
const BackwardEdge: FC<EdgeProps<Edge<ResizableEdgeData>>> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerStart,
  style,
  data,
  id,
}) => {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerStart={markerStart}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: "black",
        }}
        id={id}
      />
    </>
  );
};

export default BackwardEdge;
