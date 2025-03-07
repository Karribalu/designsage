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
  NodeTypes,
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
import { EdgeSelection } from "./edge-selection/edge-selection";
import BackwardEdge from "./edges/backward-edge";
import BiDirectionalEdge from "./edges/bi-directional-edge";
import mermaidUtility from "../utils/mermaid-utility";
import { ResizableEdgeData, ResizableNodeData } from "../types";
interface IProps {}

/**
 * @author
 * @function @CanvasComponent
 **/
const initialNodes: Node<ResizableNodeData>[] = [
  {
    id: "node-0",
    position: { x: 0, y: 300 },
    data: {
      label: "cylinder",
      height: RESIZABLE_CYLINDER_NODE_MIN_HEIGHT,
      width: RESIZABLE_CYLINDER_NODE_MIN_WIDTH,
      color: "#EBC347",
      type: "cylinder",
    },
    type: "cylinder",
  },
];
const initialEdges: Edge<ResizableEdgeData>[] = [];

// FIXME: This is a workaround to fix the type error
const nodeTypes: NodeTypes = {
  circle: ResizableCircle,
  square: ResizableSquare,
  cylinder: ResizableCylinder,
} as unknown as NodeTypes;

const edgeTypes = {
  forward: ForwardEdge,
  backward: BackwardEdge,
  biDirectional: BiDirectionalEdge,
};
let i = 0;
let getNodeId = () => {
  i++;
  return `node-${i}`;
};
const CanvasComponent: FC<IProps> = (_) => {
  const [nodes, setNodes] =
    useNodesState<Node<ResizableNodeData>>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const { nodeType } = useAppSelector((state) => state.nodeDrop);
  const [edgeSelection, setEdgeSelection] = useState<Edge | null>(null);
  const [edgeSelectionPosition, setEdgeSelectionPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("====================================");
    console.log("I am nodes ", nodes);
    console.log("====================================");
    const mermaid = mermaidUtility.convertToMermaid(nodes, edges);

    console.log("====================================");
    console.log("I am mermaid ", mermaid);
    console.log("====================================");
  }, [JSON.stringify(nodes), JSON.stringify(edges)]);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node<ResizableNodeData>>[]) => {
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
      let newNode = null;
      if (nodeType === "cylinder") {
        newNode = {
          id: getNodeId(),
          position: { x: event.clientX, y: event.clientY },
          data: {
            label: nodeType,
            height: RESIZABLE_CYLINDER_NODE_MIN_HEIGHT,
            width: RESIZABLE_CYLINDER_NODE_MIN_WIDTH,
            color: "#EBC347",
            type: nodeType,
          },
          type: nodeType,
        };
      } else {
        newNode = {
          id: getNodeId(),
          position: { x: event.clientX, y: event.clientY },
          data: {
            label: nodeType,
            height: RESIZABLE_NODE_MIN_HEIGHT,
            width: RESIZABLE_NODE_MIN_WIDTH,
            color: "#EBC347",
            type: nodeType,
          },
          type: nodeType,
        };
      }
      setNodes((nodes) => nodes.concat(newNode));
      dispatch(setSelectedNodeType(null));
    }
  };
  const onEdgeDoubleClick = (event: React.MouseEvent, edge: Edge) => {
    console.log("I am on edge double click ", event, edge);
  };
  const onEdgeClick = (event: React.MouseEvent, edge: Edge) => {
    setEdgeSelection(edge);
    setEdgeSelectionPosition({ x: event.clientX, y: event.clientY });
  };

  const onPaneClick = (event: React.MouseEvent) => {
    setEdgeSelection(null);
    setEdgeSelectionPosition(null);
  };
  const handleEdgeTypeChange = (edge: Edge, type: string) => {
    edge.type = type;
    setEdges((eds) => eds.map((e) => (e.id === edge.id ? edge : e)));
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
          markerEnd: { type: MarkerType.Arrow, strokeWidth: 3, color: "black" },
          markerStart: {
            type: MarkerType.Arrow,
            strokeWidth: 3,
            color: "black",
          },
        }}
        connectionLineType={ConnectionLineType.Straight}
        connectionLineStyle={{
          stroke: "black",
          color: "black",
          strokeWidth: 2,
        }}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
      >
        <Panel position="top-center">
          <ShapesBar />
        </Panel>
        {edgeSelection && (
          <EdgeSelection
            edge={edgeSelection}
            onEdgeTypeChange={handleEdgeTypeChange}
            style={{
              position: "absolute",
              top: 100,
              right: 50,
            }}
          />
        )}
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default CanvasComponent;
