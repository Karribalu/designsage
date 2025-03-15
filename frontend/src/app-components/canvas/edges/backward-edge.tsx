import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
} from "@xyflow/react";
import React, { FC } from "react";
import { ResizableEdgeData } from "../../types";
import { LabelHandler } from "./label-handler";
const BackwardEdge: FC<EdgeProps<Edge<ResizableEdgeData>>> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerStart,
  style,
  selected,
  data,
  id,
}) => {
  const [edgePath, labelX, labelY, offsetX, offsetY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  console.log("====================================");
  console.log("I am backward edge ", offsetX, offsetY, labelX, labelY);
  console.log("====================================");
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
        id={id}
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

export default BackwardEdge;
