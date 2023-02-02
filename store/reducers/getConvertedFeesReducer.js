import { GET_CONVERTED_FEES_DATA, GET_CONVERTED_FEES_DATA_ERROR } from "../types";

const initialState = {
  convertedfees: [],
};

const getConvertedFeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERTED_FEES_DATA:
      return {
        ...state,
        convertedfees: action.payload,
      };

    case GET_CONVERTED_FEES_DATA_ERROR:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export default getConvertedFeesReducer;
