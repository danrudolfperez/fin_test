import { GET_USER_DATA, GET_USER_DATA_ERROR } from "../types";

const initialState = {
  userdata: [],
  loading: true,
};

const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        userdata: action.payload,
        loading: false,
      };

    case GET_USER_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default getUserReducer;
