import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Edge } from "@xyflow/react";
import React, { CSSProperties, FC, useState } from "react";
import { MoveHorizontal, MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IProps {
  edge: Edge | null;
  style?: CSSProperties;
  onEdgeTypeChange: (edge: Edge, type: string) => void;
}

/**
 * @author
 * @function @EdgeSelection
 **/

export const EdgeSelection: FC<IProps> = ({
  edge,
  style,
  onEdgeTypeChange,
}) => {
  const handleEdgeTypeChange = (value: string) => {
    if (edge) {
      onEdgeTypeChange(edge, value);
    }
  };
  return (
    <Card style={{ ...style, zIndex: 1000 }}>
      <CardHeader>
        <CardTitle>Edge Selection</CardTitle>
        <CardDescription>Select the edge you want to change</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="forward" onValueChange={handleEdgeTypeChange}>
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
      </CardContent>
      {/* <CardFooter className="w-full">
        <Button className="w-full" onClick={handleEdgeTypeChange}>
          Apply
        </Button>
      </CardFooter> */}
    </Card>
  );
};
