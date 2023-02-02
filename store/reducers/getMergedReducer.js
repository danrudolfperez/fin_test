import { GET_MERGED_DATA, GET_MERGED_DATA_ERROR } from "../types";

const initialState = {
  mergeddata: [],
  originalmergeddata: [],
};

const getMergedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MERGED_DATA:
      return {
        ...state,
        mergeddata: action.payload1,
        originalmergeddata: action.payload2,
      };

    case GET_MERGED_DATA_ERROR:
      return {
        error: action.payload1,
      };

    default:
      return state;
  }
};

export default getMergedReducer;
