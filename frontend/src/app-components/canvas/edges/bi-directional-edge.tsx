import { ResizableEdgeData } from "@/app-components/types";
import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
} from "@xyflow/react";
import React, { FC } from "react";

const BiDirectionalEdge: FC<EdgeProps<Edge<ResizableEdgeData>>> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerStart,
  markerEnd,
  style,
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
      <EdgeLabelRenderer>
        <div
          className="absolute transform-origin-center nodrag nopan w-full items-center justify-center"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <input
            type="text"
            className="w-full border-none outline-none text-center "
            defaultValue={data?.label}
            onChange={(e) => {
              console.log(e.target.value);
              if (data) {
                data.label = e.target.value;
              }
            }}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default BiDirectionalEdge;
