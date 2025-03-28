import { configureStore } from "@reduxjs/toolkit";
import driverReducer from './driver'
import stationReducer from './station'
import routeReducer from './route'
import commonReducer from './common'
import userReducer from './user'

const store = configureStore({
  reducer: {
    driver: driverReducer,
    station: stationReducer,
    route: routeReducer,
    common: commonReducer,
    user: userReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;