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
  useEffect(() => {
    console.log("I am selected ", selected);
  }, [selected]);
  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: selected ? 2 : 1,
          stroke: selected ? "red" : "black",
        }}
      />
    </>
  );
};

export default ForwardEdge;
