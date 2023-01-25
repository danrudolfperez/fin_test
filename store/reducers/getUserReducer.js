import { GET_USER_DATA, GET_USER_DATA_ERROR } from "../types";

const initialState = {
  userdata: [],
};

const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        userdata: action.payload,
      };

    case GET_USER_DATA_ERROR:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export default getUserReducer;
