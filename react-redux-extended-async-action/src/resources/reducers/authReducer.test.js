import reducer from "./authReducer";
import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FINAL,
  FETCH_USER_FAIL
} from "../actiontypes";
import expect from "expect";
import { initialState } from "./authReducer";

describe("post reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FETCH_USER_START", () => {
    expect(
      reducer(initialState, {
        type: FETCH_USER_BEGIN
      })
    ).toEqual({ ...initialState, userFetching: true });
  });

  it("should handle FETCH_USER_SUCCESS", () => {
    const successAction = {
      type: FETCH_USER_SUCCESS,
      payload: { key: "123456" }
    };
    expect(reducer(initialState, successAction)).toEqual({
      ...initialState,
      token: "123456",
      isLoggedIn: true
    });
  });

  it("should handle FETCH_USER_FAIL", () => {
    const failAction = {
      type: FETCH_USER_FAIL
    };
    expect(reducer(initialState, failAction)).toEqual({
      ...initialState,
      failedCount: 1
    });
  });

  it("should handle FETCH_USER_FINAL", () => {
    const failAction = {
      type: FETCH_USER_FINAL
    };
    expect(reducer(initialState, failAction)).toEqual({
      ...initialState,
      userFetching: false
    });
  });
});
