import { Edge, Node } from "@xyflow/react";
import { ResizableNodeData } from "../types";

// Takes a list of nodes and edges and returns a mermaid string
// The nodes are in the format of { id: string, data: { label: string } }
// The edges are in the format of { id: string, source: string, target: string }
const mermaidUtility = {
  convertToMermaid: (nodes: Node<ResizableNodeData>[], edges: Edge[]) => {
    let mermaid = "graph LR\n";

    // Add nodes
    nodes.forEach((node) => {
      if (node.data.type === "circle") {
        mermaid += `    ${node.id}(("${node.data.label}"))\n`;
      } else if (node.data.type === "square") {
        mermaid += `    ${node.id}["${node.data.label}"]\n`;
      } else if (node.data.type === "cylinder") {
        mermaid += `    ${node.id}[("${node.data.label}")]\n`;
      }
    });

    

    // Add edges with different arrow styles based on edge type
    edges.forEach((edge) => {
      switch (edge.type) {
        case "forward":
          {
            if (edge.data?.label) {
              mermaid += `    ${edge.source} -->|${edge.data.label}| ${edge.target}\n`;
            } else {
              mermaid += `    ${edge.source} --> ${edge.target}\n`;
            }
          }
          break;
        case "backward":
          {
            if (edge.data?.label) {
              mermaid += `    ${edge.target} -->|${edge.data.label}| ${edge.source}\n`;
            } else {
              mermaid += `    ${edge.target} --> ${edge.source}\n`;
            }
          }
          break;
        case "biDirectional":
          {
            if (edge.data?.label) {
              mermaid += `    ${edge.source} <-->|${edge.data.label}| ${edge.target}\n`;
            } else {
              mermaid += `    ${edge.source} <--> ${edge.target}\n`;
            }
          }
          break;
        default:
          mermaid += `    ${edge.source} --> ${edge.target}\n`;
      }
    });

    return mermaid;
  },
};

export default mermaidUtility;
