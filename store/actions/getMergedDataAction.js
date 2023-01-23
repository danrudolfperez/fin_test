import { GET_MERGED_DATA, GET_MERGED_DATA_ERROR } from "../types";

export const getMergedData = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MERGED_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MERGED_DATA_ERROR,
      payload: "Error message",
    });
  }
};
