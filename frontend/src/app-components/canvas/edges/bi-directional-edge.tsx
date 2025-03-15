import { ResizableEdgeData } from "@/app-components/types";
import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
} from "@xyflow/react";
import React, { FC } from "react";
import { LabelHandler } from "./label-handler";

const BiDirectionalEdge: FC<EdgeProps<Edge<ResizableEdgeData>>> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerStart,
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
        path={edgePath}
        markerStart={markerStart}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: "black",
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

export default BiDirectionalEdge;
