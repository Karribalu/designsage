import { BaseEdge, EdgeProps, getStraightPath } from "@xyflow/react";
import React, { FC, useEffect } from "react";

const ForwardEdge: FC<EdgeProps> = ({
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
