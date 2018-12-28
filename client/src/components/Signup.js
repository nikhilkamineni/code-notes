import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

// Styles
const SignupStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  height: 100vh;
  background-color: rgb(243, 243, 243);
  border-left: 1px solid rgb(151, 151, 151);
  border-right: 1px solid rgb(151, 151, 151);
  align-items: center;

  h2 {
    padding: 20px;
  }

  h3 {
    margin: 10px;
    color: red;
  }

  button {
    width: 100px;
    margin-top: 20px;
    height: 50px;
    background-color: rgb(94, 190, 195);
    color: #ffffff;
    outline: none;
    font-size: 0.9rem;
    font-weight: bold;
    border: none;

    &:hover {
      border: 2px solid white;
    }
  }

  input {
    outline: 1px solid rgba(0 0 0 0);
    border-style: solid;
    border: 1px solid grey;
    padding: 15px;
    margin: 10px;
    width: 30%;
    min-width: 200px;
    font-size: 16px;

    &:hover {
      border-style: solid;
      outline: 1px solid rgba(0 0 0 0);
      border: 1px solid black;
    }

    &:focus {
      outline: 1px solid rgb(94, 190, 195);
      border: 1px solid rgb(94, 190, 195);
      border-style: solid;
    }
  }
`;

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
      </SignupStyled>
    );
  }
}

Signup.propTypes = {
  loginUser: PropTypes.func
};

export default Signup;
