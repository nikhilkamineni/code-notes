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

  handleLogin = () => {
    let userInfo = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(userInfo);
    this.setState({ username: "", password: "" });
  };

  render() {
    return (
      <LoginStyled>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="Input_Username"
          value={this.state.username}
          onChange={this.handleUsernameInput}
        />
        <input
          type="password"
          placeholder="Password"
          className="Input_Password"
          value={this.state.password}
          onChange={this.handlePasswordInput}
        />
        <button onClick={this.handleLogin}>Login</button>
      </LoginStyled>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func
};

export default Login;
