import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from "./reducers"

import configureMockStore from 'redux-mock-store';

export const store = process.env.NODE_ENV === "test" ? configureMockStore([reduxThunk])({
    authReducer: {}
}) : createStore(reducers, {}, applyMiddleware(reduxThunk));