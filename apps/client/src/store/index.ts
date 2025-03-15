import { configureStore } from "@reduxjs/toolkit";
import driverReducer from './driver'
import stationReducer from './station'
import routeReducer from './route'
const store = configureStore({
  reducer: {
    driver: driverReducer,
    station: stationReducer,
    route: routeReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;