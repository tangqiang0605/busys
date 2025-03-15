import { createSlice, configureStore } from "@reduxjs/toolkit";
import driverReducer from './driver'
import stationReducer from './station'
const store = configureStore({
  reducer: {
    driver: driverReducer,
    station: stationReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;