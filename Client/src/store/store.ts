import {configureStore} from "@reduxjs/toolkit";
import aircraftSlice from "./aircraftSlice";

const store = configureStore({
    reducer: aircraftSlice,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
