"use client";
import {
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  NodeChange,
  Panel,
  ReactFlow,
  useNodesState,
} from "@xyflow/react";

import React, { FC, useCallback, useEffect, useState } from "react";
import { ResizableCircle } from "./resizable-nodes/circle";
import { ShapesBar } from "./shapes-bar/shapesBar";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setSelectedNodeType } from "@/store/canvas/nodeDropReducer";
import { v4 as uuidv4 } from "uuid";
import { ResizableSquare } from "./resizable-nodes/square";
import {
  RESIZABLE_NODE_MIN_HEIGHT,
  RESIZABLE_NODE_MIN_WIDTH,
} from "@/constants";

interface IProps {}

/**
 * @author
 * @function @CanvasComponent
 **/
const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  {
    id: "3",
    position: { x: 0, y: 300 },
    data: { label: "circle", height: 100, width: 100 },
    type: "circle",
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
const nodeTypes = { circle: ResizableCircle, square: ResizableSquare };

const CanvasComponent: FC<IProps> = (_) => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const { nodeType } = useAppSelector((state) => state.nodeDrop);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("====================================");
    console.log("I am selected node changed ", nodeType);
    console.log("====================================");
  }, [nodeType]);
  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => {
      setNodes((nodes) => applyNodeChanges(changes, nodes));
    },
    [setNodes]
  );
  const onClick = (event: React.MouseEvent) => {
    if (nodeType != null) {
      console.log("Adding a new circle");

      let newNode = {
        id: uuidv4(),
        position: { x: event.clientX, y: event.clientY },
        data: {
          label: nodeType,
          height: RESIZABLE_NODE_MIN_HEIGHT,
          width: RESIZABLE_NODE_MIN_WIDTH,
        },
        type: nodeType,
      };
      setNodes((nodes) => nodes.concat(newNode));
      dispatch(setSelectedNodeType(null));
    }
    console.log("I am onlcick ", event.clientX, " ", event.clientY);
  };
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onClick={onClick}
      >
        <Panel position="top-center">
          <ShapesBar />
        </Panel>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default CanvasComponent;
