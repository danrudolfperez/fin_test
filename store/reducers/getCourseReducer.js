import { GET_COURSE_DATA, GET_COURSE_DATA_ERROR } from "../types";

const initialState = {
  coursedata: [],
  loading: true,
};

const getCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_DATA:
      return {
        ...state,
        coursedata: action.payload,
        loading: false,
      };

    case GET_COURSE_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default getCourseReducer;
