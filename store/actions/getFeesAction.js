import { GET_FEES_DATA, GET_FEES_DATA_ERROR } from "../types";

export const getFeesData = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_FEES_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FEES_DATA_ERROR,
      payload: "No Data Found",
    });
  }
};
