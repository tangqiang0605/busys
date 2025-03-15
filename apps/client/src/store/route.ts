import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RouteStore = {
  refreshTable: number,// 刷新表单的次数
}

const initialState: RouteStore = {
  refreshTable: 0,
}

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    incremented: (state, action: PayloadAction<{ unit: number }>) => {
      state.refreshTable += action.payload.unit;
    }
  },
});

export const { incremented } = routeSlice.actions;
export default routeSlice.reducer;