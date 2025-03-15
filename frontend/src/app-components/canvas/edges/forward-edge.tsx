import { EdgeType, ResizableEdgeData } from "@/app-components/types";
import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
} from "@xyflow/react";
import React, { FC, useEffect } from "react";
import { LabelHandler } from "./label-handler";

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
  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: data?.isEditing ? "black" : "grey",
        }}
        onClick={(e) => {
          console.log("clicked");
        }}
      />
      {(data?.label || selected) && (
        <EdgeLabelRenderer>
          <div
            className="absolute"
            style={{
              transform: `translate(-50%,-50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
          >
            <LabelHandler data={data} />
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default ForwardEdge;
