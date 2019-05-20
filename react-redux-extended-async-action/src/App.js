import React from "react";
import { connect } from "react-redux";

import { login } from "./resources/actions/auth";

import logo from "./logo.svg";
import "./App.css";

function App({ isLoggedIn, login }) {
  const onLogin = function() {
    login({ ID: 1 }).then(response =>
      alert(`response from async action's then is: ${JSON.stringify(response)}`)
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {isLoggedIn ? (
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            "Learn React"
          </a>
        ) : (
          <button onClick={onLogin}>Login</button>
        )}
      </header>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.authReducer.isLoggedIn
  };
}

export default connect(
  mapStateToProps,
  { login }
)(App);
