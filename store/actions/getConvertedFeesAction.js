import { GET_CONVERTED_FEES_DATA, GET_CONVERTED_FEES_DATA_ERROR } from "../types";

export const getConvertedFeesData = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CONVERTED_FEES_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CONVERTED_FEES_DATA_ERROR,
      payload: "No Data Found",
    });
  }
};
