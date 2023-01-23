import { GET_USER_DATA, GET_USER_DATA_ERROR } from "../types";

export const getUserData = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_DATA_ERROR,
      payload: "Error message",
    });
  }
};
