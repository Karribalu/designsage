"use client";
import CanvasComponent from "@/app-components/canvas/canvas";
import {Edge, Node, useNodesState} from "@xyflow/react";
import {ResizableEdgeData, ResizableNodeData} from "@/app-components/types";
import {useState} from "react";
import {NODE_SIZES} from "@/constants";

const initialNodes: Node<ResizableNodeData>[] = [
    {
        id: "node_100",
        position: {x: 0, y: 300},
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
        position: {x: 300, y: 300},
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
const Canvas = () => {
    const [nodes, setNodes] =
        useNodesState<Node<ResizableNodeData>>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    return (
        <>
            <CanvasComponent nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges}/>
        </>
    );
};

export default Canvas;
