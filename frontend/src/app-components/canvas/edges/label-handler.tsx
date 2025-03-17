import { ResizableEdgeData } from "@/app-components/types";
import { Textarea } from "@/components/ui/textarea";
import React, { FC } from "react";

interface IProps {
  data: ResizableEdgeData | undefined;
}

/**
 * @author
 * @function @LabelHandler
 **/

export const LabelHandler: FC<IProps> = (props) => {
  return (
    <>
      <Textarea
        className="border-none nopan outline-none text-center resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent "
        defaultValue={props.data?.label}
        style={{
          backgroundColor: "white",
        }}
        onChange={(e) => {
          if (props.data) {
            props.data.label = e.target.value;
          }
        }}
      />
    </>
  );
};
