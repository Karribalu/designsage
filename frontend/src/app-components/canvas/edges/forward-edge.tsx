import { ResizableEdgeData } from "@/app-components/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  useEffect(() => {
    console.log("data", data);
  }, [data]);
  /**
   * width: 30px;
  height: 30px;
  border: 5px solid #f7f9fb;
  color: var(--xy-edge-label-color-default);
  background-color: #f3f3f4;
  cursor: pointer;
  border-radius: 50%;
  font-size: 12px;
  padding-top: 0px;

  background-color: var(--xy-theme-hover);
  color: #ffffff;
   */
  console.log("====================================");
  console.log("is selected ", selected);
  console.log("====================================");
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
      {/* <Popover open={selected}>
        <PopoverTrigger
          style={{
            pointerEvents: "all",
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        ></PopoverTrigger>
        <PopoverContent
          style={{
            pointerEvents: "all",
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          Place content for the popover here.
        </PopoverContent>
      </Popover> */}
      <EdgeLabelRenderer>
        {/* <div
          className="absolute transform-origin-center nodrag nopan w-full items-center justify-center"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <input
            type="text"
            className="border-none outline-none text-center "
            defaultValue={data?.label}
            onChange={(e) => {
              console.log(e.target.value);
              if (data) {
                data.label = e.target.value;
              }
            }}
            style={{
              width: data?.isEditing ? "100%" : "fit-content",
              height: "100%",
              backgroundColor: "transparent",
            }}
          />
        </div> */}
        <LabelHandler open={selected} labelX={labelX} labelY={labelY} />
      </EdgeLabelRenderer>
    </>
  );
};

export default ForwardEdge;
