import { GET_FEES_SYMBOL, GET_FEES_SYMBOL_ERROR } from "../types";

export const getFeesSymbol = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_FEES_SYMBOL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FEES_SYMBOL_ERROR,
      payload: "No Data Found",
    });
  }
};
