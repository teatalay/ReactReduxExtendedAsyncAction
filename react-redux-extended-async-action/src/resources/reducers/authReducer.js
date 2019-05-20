import {
  FETCH_USER_BEGIN,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  FETCH_USER_FINAL,
  SET_TOKEN_FROM_STORAGE,
  CHECK_AUTHORIZATION_SUCCESS,
  CHECK_AUTHORIZATION_FAIL,
  CHECK_AUTHORIZATION_FINAL,
  LOGOUT_SUCCESS,
  GET_PERMISSIONS_SUCCESS
} from "../actiontypes";
import { writeStorageItem } from "../../common/storage";
import { tokenStorageKey } from "../../constants";

export const initialState = {
  userFetching: false,
  failedCount: 0,
  token: "",
  isLoggedIn: false,
  isAuthChecked: false,
  userData: {},
  authorizationData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return { ...state, isLoggedIn: false, token: initialState.token };
    case FETCH_USER_BEGIN:
      return { ...state, userFetching: true };
    case FETCH_USER_FAIL:
      const { failedCount } = state;
      return { ...state, failedCount: failedCount + 1 };
    case FETCH_USER_SUCCESS:
      writeStorageItem(tokenStorageKey, action.payload.key);
      return { ...state, token: action.payload.key, isLoggedIn: true };
    case FETCH_USER_FINAL:
      return { ...state, userFetching: false };
    case SET_TOKEN_FROM_STORAGE:
      return {
        ...state,
        token: action.payload || initialState.token,
        isAuthChecked: !action.payload
      };
    case CHECK_AUTHORIZATION_FINAL:
      return { ...state };
    case CHECK_AUTHORIZATION_FAIL:
      return { ...state, isAuthChecked: true };
    case CHECK_AUTHORIZATION_SUCCESS:
      const result = action.payload.results;
      const userData =
        result && result.length ? result[0] : initialState.userData;
      if (!userData.userprofile) userData.userprofile = {};
      return {
        ...state,
        isLoggedIn: true,
        userData
      };
    case GET_PERMISSIONS_SUCCESS:
      return {
        ...state,
        authorizationData: action.payload,
        isAuthChecked: true
      };
    default:
      return state;
  }
}
