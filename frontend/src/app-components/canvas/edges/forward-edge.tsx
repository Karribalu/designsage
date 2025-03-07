import { ResizableEdgeData } from "@/app-components/types";
import { BaseEdge, Edge, EdgeProps, getStraightPath } from "@xyflow/react";
import React, { FC } from "react";

const ForwardEdge: FC<EdgeProps<Edge<ResizableEdgeData>>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  style,
  selected,
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
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: selected ? "red" : "black",
        }}
      />
    </>
  );
};

export default ForwardEdge;
