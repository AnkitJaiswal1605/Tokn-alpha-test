import axios from "axios";

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./userActions";

export const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

export const signupSuccess = (user) => {
  console.log("User", user);
  return {
    type: SIGNUP_SUCCESS,
    payload: user,
  };
};

export const signupFailure = (error) => {
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  };
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const signup =
  ({ username, password, confirm_password, email, walletAddress }) =>
  (dispatch) => {
    dispatch(signupRequest());
    console.log("in SignUp action");

    return confirm_password === password
      ? axios
          .post("http://localhost:8081/newUser", {
            username,
            password,
            email,
            walletAddress,
          })
          .then((response) => {
            console.log(response);
            dispatch(signupSuccess({ username, email }));
            window.location = "/buy-now";
          })
          .catch((error) => {
            dispatch(signupFailure(error.message));
            alert(error.message);
          })
      : dispatch(signupFailure("ERROR: Both passwords don't match."));
  };

export const login =
  ({ email, password, walletAddress }) =>
  (dispatch) => {
    dispatch(loginRequest());
    console.log("email", email);
    return axios
      .post("http://localhost:8081/login", { email, password, walletAddress })
      .then((response) => {
        let user = {
          userName: response.data.userName,
          email,
        };
        dispatch(loginSuccess(user));
        window.location = "/buy-now";
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };
