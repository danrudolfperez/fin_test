import { GET_MERGED_DATA, GET_MERGED_DATA_ERROR } from "../types";

const initialState = {
  mergeddata: [],
  loading: true,
};

const getMergedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MERGED_DATA:
      return {
        ...state,
        mergeddata: action.payload,
        loading: false,
      };

    case GET_MERGED_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default getMergedReducer;
