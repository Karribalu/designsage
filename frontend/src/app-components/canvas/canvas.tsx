"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { NODE_SIZES } from "@/constants";
import { setSelectedNodeType } from "@/store/canvas/nodeDropReducer";
import {
  addEdge,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  Edge,
  MarkerType,
  Node,
  NodeChange,
  NodeTypes,
  OnConnect,
  Panel,
  ReactFlow,
  useNodesState,
} from "@xyflow/react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { ShapesBar } from "../shapes-bar/shapesBar";
import { ResizableEdgeData, ResizableNodeData } from "../types";
import mermaidUtility from "../utils/mermaid-utility";
import { EdgeSelection } from "./edge-selection/edge-selection";
import BackwardEdge from "./edges/backward-edge";
import BiDirectionalEdge from "./edges/bi-directional-edge";
import ForwardEdge from "./edges/forward-edge";
import { ResizableCircle } from "./resizable-nodes/circle";
import ResizableCylinder from "./resizable-nodes/cylinder";
import { ResizableSquare } from "./resizable-nodes/square";
interface IProps {}

/**
 * @author
 * @function @CanvasComponent
 **/
const initialNodes: Node<ResizableNodeData>[] = [
  {
    id: "node_100",
    position: { x: 0, y: 300 },
    data: {
      label: "cylinder",
      color: "#EBC347",
      type: "cylinder",
      ...NODE_SIZES["cylinder"],
    },
    type: "cylinder",
  },
  {
    id: "node_101",
    position: { x: 300, y: 300 },
    data: {
      label: "cylinder",
      color: "#EBC347",
      type: "cylinder",
      ...NODE_SIZES["cylinder"],
    },
    type: "cylinder",
  },
];
const initialEdges: Edge<ResizableEdgeData>[] = [
  {
    id: "edge_100",
    source: "node_100",
    target: "node_101",
    selected: true,
    data: {
      label: "label",
      isEditing: false,
      type: "forward",
      color: "black",
      style: "solid",
      setSelected: (isSelected: boolean) => {
        console.log("isSelected", isSelected);
      },
    },
  },
];

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
  return `node_${i}`;
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
      let newNode = {
        id: getNodeId(),
        position: { x: event.clientX, y: event.clientY },
        data: {
          label: nodeType,
          color: "#EBC347",
          type: nodeType,
          ...NODE_SIZES[nodeType],
        },
        type: nodeType,
      };
      setNodes((nodes) => nodes.concat(newNode));
      dispatch(setSelectedNodeType(null));
    }
  };
  const onEdgeDoubleClick = (event: React.MouseEvent, edge: Edge) => {
    console.log("I am on edge double click ", event, edge);
    edge.data = {
      ...edge.data,
      isEditing: true,
      setSelected: (isSelected: boolean) => {
        console.log("isSelected", isSelected);
      },
    };
    setEdges((eds) => eds.map((e) => (e.id === edge.id ? edge : e)));
  };
  const onEdgeClick = (event: React.MouseEvent, edge: Edge) => {
    setEdgeSelection(edge);
    setEdgeSelectionPosition({ x: event.clientX, y: event.clientY });
    // edge.data = {
    //   ...edge.data,
    //   selected: true,
    //   isEditing: false,
    // };
    // setEdges((eds) => eds.map((e) => (e.id === edge.id ? edge : e)));
    setEdges((eds) =>
      eds.map((e) => {
        if (e.id === edge.id) {
          return {
            ...e,
            selected: true,
            data: {
              ...e.data,
              isEditing: false,
            },
          };
        }
        return {
          ...e,
          selected: false,
          data: {
            ...e.data,
            isEditing: false,
          },
        };
      })
    );
  };

  const onPaneClick = (event: React.MouseEvent) => {
    setEdgeSelection(null);
    setEdgeSelectionPosition(null);
    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        selected: false,
        data: { ...e.data, isEditing: false },
      }))
    );
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
          label: "label",
          markerEnd: { type: MarkerType.Arrow, strokeWidth: 3, color: "black" },
          markerStart: {
            type: MarkerType.Arrow,
            strokeWidth: 3,
            color: "black",
          },
          data: {
            label: null,
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
