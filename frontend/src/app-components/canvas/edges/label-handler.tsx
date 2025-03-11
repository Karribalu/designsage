import { Popover, PopoverContent } from "@/components/ui/popover";
import React, { FC } from "react";

interface IProps {
  open: boolean | undefined;
  labelX: number;
  labelY: number;
}

/**
 * @author
 * @function @LabelHandler
 **/

export const LabelHandler: FC<IProps> = (props) => {
  return (
    <Popover open={props.open}>
      <PopoverContent
        style={{
          pointerEvents: "all",
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${props.labelX}px,${props.labelY}px)`,
          width: "fit-content",
        }}
      >
        Place
      </PopoverContent>
    </Popover>
  );
};
