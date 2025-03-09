export const RESIZABLE_NODE_MIN_WIDTH = 120;
export const RESIZABLE_NODE_MIN_HEIGHT = 120;

export const RESIZABLE_CYLINDER_NODE_MIN_WIDTH = 130;
export const RESIZABLE_CYLINDER_NODE_MIN_HEIGHT = 160;

export const EDGE_TYPES = {
  forward: "forward",
  backward: "backward",
};

export const NODE_SIZES: Record<string, { width: number; height: number }> = {
  circle: {
    width: 120,
    height: 120,
  },
  cylinder: {
    width: 110,
    height: 140,
  },
  square: {
    width: 120,
    height: 120,
  },
};
