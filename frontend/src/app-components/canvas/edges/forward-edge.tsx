import { EdgeType, ResizableEdgeData } from "@/app-components/types";
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
import { Label } from "@radix-ui/react-label";
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
  // setSelected,
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
  const handleApply = (text: string, type: EdgeType) => {
    console.log("text", text);
    console.log("type", type);
    if (data) {
      data.label = text;
      data.type = type;
    }
    setSelected(false);
  };
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
        <Label
          style={{
            pointerEvents: "all",
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          {data?.label}
        </Label>

        <LabelHandler
          open={selected}
          labelX={labelX}
          labelY={labelY}
          edgeType={data?.type}
          label={data?.label}
          onApply={handleApply}
        />
      </EdgeLabelRenderer>
    </>
  );
};

export default ForwardEdge;
