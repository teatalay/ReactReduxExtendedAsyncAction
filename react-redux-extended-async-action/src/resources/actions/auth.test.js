import moxios from "moxios";
import expect from "expect";
import { login } from "./auth";
import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FINAL
} from "../actiontypes";
import { setupNetwork } from "../../common/network";
import { store } from "../store";

const mockData = {
  success: true,
  user: {
    ID: "1",
    profile: {
      name: "Tuğrul Emre",
      surname: "Atalay",
      birthDate: "21.08.1991"
    }
  }
};

describe("getPosts actions", () => {
  beforeEach(function() {
    moxios.install();
    setupNetwork();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it("creates FETCH_USER_SUCCESS after successfuly fetching", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData
      });
    });

    const expectedActions = [
      { type: FETCH_USER_BEGIN },
      { type: FETCH_USER_SUCCESS, payload: mockData },
      { type: FETCH_USER_FINAL }
    ];
    return store.dispatch(login()).then(async () => {
      const actions = await store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
