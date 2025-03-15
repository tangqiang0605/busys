import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StationStore = {
  refreshTable: number,// 刷新表单的次数
}

const initialState: StationStore = {
  refreshTable: 0,
}

const stationSlice = createSlice({
  name: "station",
  initialState,
  reducers: {
    incremented: (state, action: PayloadAction<{ unit: number }>) => {
      state.refreshTable += action.payload.unit;
    }
  },
});

export const { incremented } = stationSlice.actions;
export default stationSlice.reducer;