import { createSlice, configureStore } from "@reduxjs/toolkit";
import driverReducer from './driver'
const store = configureStore({
  reducer: {
    driver: driverReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;