import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";

import SignupStyled from "./Signup.styled.js";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

// Signup Component
class Signup extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    passwordMatch: true
  };

  handleUsernameInput = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordInput = event => {
    if (event.target.value === this.state.confirmPassword) {
      this.setState({ passwordMatch: true, password: event.target.value });
    } else {
      this.setState({ passwordMatch: false, password: event.target.value });
    }
  };

  handleConfirmPasswordInput = event => {
    if (this.state.password === event.target.value) {
      this.setState({
        passwordMatch: true,
        confirmPassword: event.target.value
      });
    } else {
      this.setState({
        passwordMatch: false,
        confirmPassword: event.target.value
      });
    }
  };

  handleSignup = async () => {
    const { username, password } = this.state;

    if (!username || !password)
      //eslint-disable-next-line
      return console.error('Username and Password are required!');

    if (!this.state.passwordMatch)
      //eslint-disable-next-line
      return console.error('Passwords do not match!');

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        password
      });
      if (response.status === 200) {
        await this.setState({
          username: "",
          password: "",
          confirmPassword: "",
          passwordMatch: true
        });
        this.props.loginUser({ username, password });
      }
    } catch (err) {
      console.error(err); // eslint-disable-line
    }
  };

  render() {
    return (
      <SignupStyled>
        <h2>Signup</h2>
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
        <input
          type="password"
          placeholder="Confirm password"
          className="Input_ConfirmPassword"
          value={this.state.confirmPassword}
          onChange={this.handleConfirmPasswordInput}
        />
        <button onClick={this.handleSignup}>Sign Up</button>
        {!this.state.passwordMatch && <h3>Passwords do not match</h3>}
        <button onClick={this.props.showLogin}>Login</button>
      </SignupStyled>
    );
  }
}

Signup.propTypes = {
  loginUser: PropTypes.func,
  showLogin: PropTypes.func
};

export default Signup;
