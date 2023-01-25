import { GET_FEES_DATA, GET_FEES_DATA_ERROR } from "../types";

const initialState = {
  fees: [],
};

const getFeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEES_DATA:
      return {
        ...state,
        fees: action.payload,
      };

    case GET_FEES_DATA_ERROR:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export default getFeesReducer;
