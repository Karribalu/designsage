import { BaseEdge, EdgeProps, getStraightPath } from "@xyflow/react";
import React, { FC } from "react";

const BackwardEdge: FC<EdgeProps> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerStart,
  markerEnd,
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
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 1,
          stroke: "black",
        }}
      />
    </>
  );
};

export default BackwardEdge;
