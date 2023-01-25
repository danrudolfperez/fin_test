import { GET_CURRENCIES_DATA, GET_CURRENCIES_DATA_ERROR } from "../types";

export const getCurrenciesData = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CURRENCIES_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CURRENCIES_DATA_ERROR,
      payload: "No Data Found",
    });
  }
};
