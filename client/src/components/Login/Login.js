import PropTypes from "prop-types";
import React, { Component } from "react";

import LoginStyled from "./Login.styled.js";

class Login extends Component {
  state = {
    username: "",
    password: "",
    loginError: null
  };

  handleUsernameInput = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordInput = event => {
    this.setState({ password: event.target.value });
  };

  handleLogin = async e => {
    e.preventDefault();
    let userInfo = {
      username: this.state.username,
      password: this.state.password
    };
    const loginError = await this.props.loginUser(userInfo);
    if (loginError) {
      console.log(loginError)
      this.setState({ loginError });
    } 
  };

  render() {
    return (
      <LoginStyled id="Login">
        <form id="Login__LoginForm" onSubmit={this.handleLogin}>
          <div id="Login__Logo">
            <h1 id="Logo__TopLine">{"{ codex }"}</h1>
          </div>
          <div id="Login__Tagline">
            a place to stash code snippets
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

          <p id="loginError">
            {this.state.loginError ? this.state.loginError : null}
          </p>
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
