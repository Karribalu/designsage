"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface NodeDropState {
  nodeType: string | null;
}
const initialState: NodeDropState = {
  nodeType: null,
};
export const nodeDropSlice = createSlice({
  name: "nodeDrop",
  initialState,
  reducers: {
    setSelectedNodeType: (state, action: PayloadAction<string | null>) => {
      state.nodeType = action.payload;
    },
  },
});

export const { setSelectedNodeType } = nodeDropSlice.actions;
// export const selectCount = (state: RootState) => state;
export default nodeDropSlice.reducer;
