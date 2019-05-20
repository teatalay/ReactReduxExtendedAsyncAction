import { sendRequest } from "../../common/network";
import { httpMethods } from "../../constants/commontypes";
import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  FETCH_USER_FINAL,
  CHECK_AUTHORIZATION_SUCCESS,
  CHECK_AUTHORIZATION_FAIL,
  CHECK_AUTHORIZATION_FINAL,
  LOGOUT_SUCCESS,
  SET_TOKEN_FROM_STORAGE,
  GET_PERMISSIONS_SUCCESS
} from "../actiontypes";
import {
  loginURL,
  checkAuthorizationURL,
  logoutURL,
  getPermissionsURL
} from "../../constants/serviceUrls";
import { tokenStorageKey } from "../../constants";
import { readStorageItem, removeStorageItem } from "../../common/storage";

export function setTokenFromStorage() {
  const token = readStorageItem(tokenStorageKey);
  return dispatch => {
    dispatch({
      type: SET_TOKEN_FROM_STORAGE,
      payload: token
    });
  };
}

export function login(params = {}) {
  return async () => {
    return sendRequest({
      params,
      url: loginURL,
      method: httpMethods.POST,
      onBegin: () => {
        return {
          type: FETCH_USER_BEGIN
        };
      },
      onSuccess: result => {
        return {
          type: FETCH_USER_SUCCESS,
          payload: result
        };
      },
      onFail: error => {
        return {
          type: FETCH_USER_FAIL,
          payload: error
        };
      },
      onFinally: () => {
        return {
          type: FETCH_USER_FINAL
        };
      }
    });
  };
}

export function checkAuthorization(params = {}) {
  return async () => {
    return sendRequest({
      params,
      url: checkAuthorizationURL,
      method: httpMethods.GET,
      onSuccess: result => {
        return {
          type: CHECK_AUTHORIZATION_SUCCESS,
          payload: result
        };
      },
      onFail: () => {
        return {
          type: CHECK_AUTHORIZATION_FAIL
        };
      },
      onFinally: () => {
        return {
          type: CHECK_AUTHORIZATION_FINAL
        };
      }
    });
  };
}

export function logout(params = {}) {
  removeStorageItem(tokenStorageKey);
  return async () => {
    return sendRequest({
      params,
      url: logoutURL,
      method: httpMethods.POST,
      useDefaultBaseURL: true,
      onSuccess: result => {
        return {
          type: LOGOUT_SUCCESS,
          payload: result
        };
      }
    });
  };
}

export function getPermissions(userID) {
  return async () => {
    return sendRequest({
      url: getPermissionsURL.replace("{0}", userID),
      method: httpMethods.GET,
      onSuccess: result => {
        return {
          type: GET_PERMISSIONS_SUCCESS,
          payload: result
        };
      }
    });
  };
}
