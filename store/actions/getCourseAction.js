import { GET_COURSE_DATA, GET_COURSE_DATA_ERROR } from "../types";

export const getCourseData = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COURSE_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COURSE_DATA_ERROR,
      payload: "No Data Found",
    });
  }
};
