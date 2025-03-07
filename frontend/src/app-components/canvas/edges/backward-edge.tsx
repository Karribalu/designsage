import { BaseEdge, Edge, EdgeProps, getStraightPath } from "@xyflow/react";
import React, { FC } from "react";
import { ResizableEdgeData } from "../../types";
const BackwardEdge: FC<EdgeProps<Edge<ResizableEdgeData>>> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerStart,
  style,
}) => {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const handleEdgeDoubleClick = (event: React.MouseEvent) => {
    console.log("I am on edge double click ", event);
  };

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
      />
    </>
  );
};

export default BackwardEdge;
