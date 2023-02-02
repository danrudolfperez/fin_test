import { GET_MERGED_DATA, GET_MERGED_DATA_ERROR } from "../types";

export const getMergedData = (data1, data2) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MERGED_DATA,
      payload1: data1,
      payload2: data2
    });
  } catch (error) {
    dispatch({
      type: GET_MERGED_DATA_ERROR,
      payload1: "No Data Found",
      payload2: "",
    });
  }
};
