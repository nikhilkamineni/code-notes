import PropTypes from "prop-types";
import React, { Component } from "react";

import LoginStyled from "./Login.styled.js";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleUsernameInput = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordInput = event => {
    this.setState({ password: event.target.value });
  };

  handleLogin = e => {
    e.preventDefault();
    let userInfo = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(userInfo);
    this.setState({ username: "", password: "" });
  };

  render() {
    return (
      <LoginStyled id="Login">
        <form id="Login__LoginForm" onSubmit={this.handleLogin}>
          <div id="Login__Logo">
            <h1 id="Logo__TopLine">{"{ codex }"}</h1>
            {/* <h1 id="Logo__BottomLine">{"Notes }"}</h1> */}
          </div>
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleUsernameInput}
          />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordInput}
          />
          <button type="submit" className="SubmitButton">
            Login
          </button>
        </form>
        <div id="Login__SignupContainer">
          {"Don't have an account?"}{" "}
          <button
            id="SignupContainer__SignupLink"
            onClick={this.props.showSignup}
          >
            Sign Up
          </button>
        </div>
      </LoginStyled>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func,
  showSignup: PropTypes.func
};

export default Login;
