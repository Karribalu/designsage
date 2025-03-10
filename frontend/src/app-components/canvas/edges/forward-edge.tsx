import { ResizableEdgeData } from "@/app-components/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
} from "@xyflow/react";
import React, { FC, useEffect } from "react";

const ForwardEdge: FC<EdgeProps<Edge<ResizableEdgeData>>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  style,
  selected,
  data,
}) => {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  useEffect(() => {
    console.log("data", data);
  }, [data]);
  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <BaseEdge
            id={id}
            path={edgePath}
            markerEnd={markerEnd}
            style={{
              ...style,
              strokeWidth: 2,
              stroke: data?.isEditing ? "red" : "black",
            }}
          />
        </HoverCardTrigger>
        <HoverCardContent>
          The React Framework – created and maintained by @vercel.
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

export default ForwardEdge;
