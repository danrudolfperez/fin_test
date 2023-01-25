import { GET_CURRENCIES_DATA, GET_CURRENCIES_DATA_ERROR } from "../types";

const initialState = {
  currenciesdata: [],
};

const getCurrenciesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENCIES_DATA:
      return {
        ...state,
        currenciesdata: action.payload,
      };

    case GET_CURRENCIES_DATA_ERROR:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export default getCurrenciesReducer;
