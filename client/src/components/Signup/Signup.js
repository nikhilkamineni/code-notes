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
    passwordMatch: true,
    signupError: false
  };

  handleUsernameInput = event => {
    this.setState({ username: event.target.value, signupError: false });
  };

  handlePasswordInput = event => {
    if (event.target.value === this.state.confirmPassword) {
      this.setState({
        passwordMatch: true,
        password: event.target.value,
        signupError: false
      });
    } else {
      this.setState({
        passwordMatch: false,
        password: event.target.value,
        signupError: false
      });
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

  handleSignup = async e => {
    e.preventDefault();
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
      if (response.status === 201) {
        await this.setState({
          username: "",
          password: "",
          confirmPassword: "",
          passwordMatch: true
        });
        await this.props.loginUser({ username, password });
      }
    } catch (err) {
      this.setState({ signupError: true });
      console.error(err); // eslint-disable-line
    }
  };

  render() {
    return (
      <SignupStyled id="Signup">
        <form id="Signup__SignupForm">
          <div id="SignupForm__Logo">
            <h1 id="Logo__TopLine">{"{ codex }"}</h1>
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
          <input
            type="password"
            placeholder="Confirm password"
            value={this.state.confirmPassword}
            onChange={this.handleConfirmPasswordInput}
          />
          <button
            className="SignupForm__SubmitButton"
            type="submit"
            onClick={this.handleSignup}
          >
            Sign Up
          </button>
          <div className="SignupForm__Error">
            {!this.state.passwordMatch && <p>Passwords do not match</p>}
            {this.state.signupError && <p>There was an error signing up!</p>}
          </div>
        </form>

        <div id="Signup__LoginContainer">
          Already have an account?
          <button id="LoginContainer__LoginLink" onClick={this.props.showLogin}>
            Log in
          </button>
        </div>
      </SignupStyled>
    );
  }
}

Signup.propTypes = {
  loginUser: PropTypes.func,
  showLogin: PropTypes.func
};

export default Signup;
