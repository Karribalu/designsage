import { BaseEdge, EdgeProps, getStraightPath } from "@xyflow/react";
import React, { FC } from "react";

const BiDirectionalEdge: FC<EdgeProps> = ({
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
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerStart={markerStart}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: "black",
        }}
      />
    </>
  );
};

export default BiDirectionalEdge;
