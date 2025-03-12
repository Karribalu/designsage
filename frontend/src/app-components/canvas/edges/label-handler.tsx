import { EdgeType } from "@/app-components/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { LetterText, MoveHorizontal, MoveLeft, MoveRight } from "lucide-react";
import React, { FC, useEffect, useState } from "react";

interface IProps {
  open: boolean | undefined;
  labelX: number;
  labelY: number;
  edgeType: EdgeType | undefined;
  label?: string;
  onApply: (text: string, type: EdgeType) => void;
}

/**
 * @author
 * @function @LabelHandler
 **/

export const LabelHandler: FC<IProps> = (props) => {
  const [selectedTool, setSelectedTool] = useState<"text" | "type" | null>(
    null
  );
  const [text, setText] = useState<string>(props.label ?? "");
  const [type, setType] = useState<EdgeType>(props.edgeType ?? "forward");
  const handleToolChange = (tool: "text" | "type") => {
    setSelectedTool(tool);
  };

  useEffect(() => {
    if (!props.open) {
      setSelectedTool(null);
    }
  }, [props.open]);

  const handleApply = () => {
    console.log("apply");
    props.onApply(text, type);
  };
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
        {selectedTool === null && (
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200">
              <LetterText
                size={16}
                strokeWidth={2}
                onClick={() => handleToolChange("text")}
              />
            </div>
            <div className="p-2 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200">
              <MoveHorizontal
                size={16}
                strokeWidth={2}
                onClick={() => handleToolChange("type")}
              />
            </div>
          </div>
        )}
        {selectedTool === "text" && (
          <div className="flex flex-col gap-2">
            <Textarea value={text} onChange={(e) => setText(e.target.value)} />
            <Button onClick={handleApply}>Apply</Button>
          </div>
        )}
        {selectedTool === "type" && (
          <div className="flex ">
            <RadioGroup
              defaultValue={type}
              onValueChange={(value) => setType(value as EdgeType)}
            >
              <div className=" flex items-center space-x-4 rounded-md border p-4">
                <RadioGroupItem value="forward" id="forward" />
                <div className="flex items-center space-x-13">
                  <Label htmlFor="forward">Forward Arrow</Label>
                  <MoveRight strokeWidth={4} />
                </div>
              </div>
              <div className=" flex items-center space-x-4 rounded-md border p-4">
                <RadioGroupItem value="backward" id="backward" />
                <div className="flex items-center space-x-10">
                  <Label htmlFor="backward">Backward Arrow</Label>
                  <MoveLeft strokeWidth={4} />
                </div>
              </div>
              <div className=" flex items-center space-x-4 rounded-md border p-4">
                <RadioGroupItem value="biDirectional" id="biDirectional" />
                <div className="flex items-center space-x-4">
                  <Label htmlFor="biDirectional">Bi-Directional Arrow</Label>
                  <MoveHorizontal strokeWidth={4} />
                </div>
              </div>
            </RadioGroup>
            <Button onClick={handleApply}>Apply</Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
