import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CommonStore = {
  refreshTable: number,// 刷新表单的次数
}

const initialState: CommonStore = {
  refreshTable: 0,
}

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    incremented: (state, action: PayloadAction<{ unit: number }>) => {
      state.refreshTable += action.payload.unit;
    }
  },
});

export const { incremented } = commonSlice.actions;
export default commonSlice.reducer;