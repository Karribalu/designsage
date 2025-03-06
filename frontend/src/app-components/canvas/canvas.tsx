"use client";
import {
  addEdge,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  NodeChange,
  OnConnect,
  Panel,
  ReactFlow,
  useNodesState,
  MarkerType,
  ConnectionLineType,
} from "@xyflow/react";

import React, { FC, useCallback, useEffect, useState } from "react";
import { ResizableCircle } from "./resizable-nodes/circle";
import { ShapesBar } from "../shapes-bar/shapesBar";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setSelectedNodeType } from "@/store/canvas/nodeDropReducer";
import { v4 as uuidv4 } from "uuid";
import { ResizableSquare } from "./resizable-nodes/square";
import {
  RESIZABLE_CYLINDER_NODE_MIN_HEIGHT,
  RESIZABLE_CYLINDER_NODE_MIN_WIDTH,
  RESIZABLE_NODE_MIN_HEIGHT,
  RESIZABLE_NODE_MIN_WIDTH,
} from "@/constants";
import ResizableCylinder from "./resizable-nodes/cylinder";
import ForwardEdge from "./edges/forward-edge";

interface IProps {}

/**
 * @author
 * @function @CanvasComponent
 **/
const initialNodes: Node[] = [
  {
    id: "3",
    position: { x: 0, y: 300 },
    data: { label: "cylinder", height: 100, width: 100, color: "blue" },
    type: "cylinder",
  },
];
const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "forward",
    markerEnd: { type: MarkerType.Arrow },
  },
];
const nodeTypes = {
  circle: ResizableCircle,
  square: ResizableSquare,
  cylinder: ResizableCylinder,
};

const edgeTypes = {
  forward: ForwardEdge,
};
let i = 0;
let getEdgeId = () => {
  i++;
  return `edge-${i}`;
};
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
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onClick = (event: React.MouseEvent) => {
    if (nodeType != null) {
      console.log("Adding a new circle");

      let newNode = null;
      if (nodeType === "cylinder") {
        newNode = {
          id: uuidv4(),
          position: { x: event.clientX, y: event.clientY },
          data: {
            label: nodeType,
            height: RESIZABLE_CYLINDER_NODE_MIN_HEIGHT,
            width: RESIZABLE_CYLINDER_NODE_MIN_WIDTH,
            color: "#EBC347",
          },
          type: nodeType,
        };
      } else {
        newNode = {
          id: getEdgeId(),
          position: { x: event.clientX, y: event.clientY },
          data: {
            label: nodeType,
            height: RESIZABLE_NODE_MIN_HEIGHT,
            width: RESIZABLE_NODE_MIN_WIDTH,
            color: "#EBC347",
          },
          type: nodeType,
        };
      }
      setNodes((nodes) => nodes.concat(newNode));
      dispatch(setSelectedNodeType(null));
    }
    console.log("I am onlcick ", event.clientX, " ", event.clientY);
  };
  const onEdgeDoubleClick = (event: React.MouseEvent, edge: Edge) => {
    console.log("I am on edge double click ", event, edge);
  };
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        onClick={onClick}
        defaultEdgeOptions={{
          type: "forward",
          markerEnd: { type: MarkerType.Arrow, strokeWidth: 1, color: "black" },
        }}
        connectionLineType={ConnectionLineType.Straight}
        connectionLineStyle={{
          stroke: "black",
          color: "black",
          strokeWidth: 1,
        }}
        onEdgeDoubleClick={onEdgeDoubleClick}
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
