import { GET_FEES_SYMBOL, GET_FEES_SYMBOL_ERROR } from "../types";

const initialState = {
  feessymbol: '$',
};

const getFeesSymbolReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEES_SYMBOL:
      return {
        ...state,
        feessymbol: action.payload,
      };

    case GET_FEES_SYMBOL_ERROR:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export default getFeesSymbolReducer;
