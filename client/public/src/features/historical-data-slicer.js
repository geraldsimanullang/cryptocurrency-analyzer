import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isFetching: false,
  data: {},
  error: undefined,
  test: "lalalalala",
};

export const historicalDataSlicer = createSlice({
  name: "Historical Data",
  initialState,
  reducers: {
    fetching(state) {
      state.isFetching = true;
      state.data = {};
      state.error = undefined;
    },

    fetchSuccess(state, action) {
      state.isFetching = false;
      state.data = action.payload;
      state.error = undefined;
    },

    fetchFailed(state, action) {
      state.isFetching = false;
      state.data = {};
      state.error = action.payload;
    },
  },
});

export const { fetching, fetchSuccess, fetchFailed } =
  historicalDataSlicer.actions;
export default historicalDataSlicer.reducer;

// thunk
export const fetchHistoricalData = (coinName) => async (dispatch) => {
  try {
    dispatch(fetching());

    const { data } = await axios.get(
      `https://cryptocurrency-analyzer.geraldsimanullang.site/coins/${coinName}/historical-price-data/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      }
    );
    console.log(data);

    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchFailed(error));
    console.log(error);
  }
};
