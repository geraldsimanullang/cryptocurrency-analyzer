import { configureStore } from "@reduxjs/toolkit";
import historicalDataReducer from "../features/historical-data-slicer";

export const store = configureStore({
  reducer: {
    historicalData: historicalDataReducer,
  },
});
