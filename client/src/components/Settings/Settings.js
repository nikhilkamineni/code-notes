import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";

import SettingsStyled from "./Settings.styled.js";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

class Settings extends Component {
  state = {
    theme: this.props.theme,
    changePasswordMessage: null,
    changePasswordError: null
  };

  handleChangePassword = async e => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const confirmNewPassword = e.target.confirmNewPassword.value;

    // Error handling
    if (newPassword !== confirmNewPassword)
      return this.setState({ changePasswordError: "Passwords do not match!" });

    if (newPassword.length < 3)
      return this.setState({ changePasswordError: "Password is too short!" });

    // Make request to API to change password
    try {
      const token = localStorage.getItem("token");
      const header = { headers: { Authorization: token } };

      const response = await axios.put(
        `${API_URL}/user/change-password`,
        { password: newPassword },
        header
      );
      if (response.status === 200) {
        this.setState({
          changePasswordMessage: "Password was changed successfully!",
          changePasswordError: null
        });
        // Clear input fields after succesful password change
        document.getElementById("Settings__ChangePasswordForm").reset();
      }
    } catch (err) {
      this.setState({ changePasswordError: "Error changing your password!" });
    }
  };

  handleChangeTheme = e => {
    this.props.updateTheme(e.target.value);
  };

  render() {
    return (
      <SettingsStyled className="Settings" theme={this.props.theme}>
        <header>
          <h2>Settings</h2>
        </header>

        <div id="Settings__Content">
          <form
            id="Settings__ChangePasswordForm"
            onSubmit={this.handleChangePassword}
          >
            <h3 className="ChangePasswordForm__Label">Change Password</h3>
            <input
              className="ChangePasswordForm__Input"
              type="password"
              name="newPassword"
              placeholder="New password"
            />
            <input
              className="ChangePasswordForm__Input"
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm new password"
            />
            <input
              type="submit"
              className="ChangePasswordForm__Submit SubmitButton"
            />
            <p id="ChangePasswordForm__message">
              {this.state.changePasswordMessage}
            </p>
            <p id="ChangePasswordForm__error">
              {this.state.changePasswordError}
            </p>
          </form>

          <form className="Settings__Theme" onChange={this.handleChangeTheme}>
            <h3>Theme</h3>
            <div id="Theme__Content">
              <div className="Theme__option">
                <input
                  id="light"
                  type="radio"
                  name="theme"
                  value="light"
                  defaultChecked={this.state.theme === "light"}
                />{" "}
                <label
                  htmlFor="light"
                  id={this.props.theme === "light" ? "currentTheme" : null}
                >
                  Light
                </label>
              </div>
              <div className={"Theme__option"}>
                <input
                  id="dark"
                  type="radio"
                  name="theme"
                  value="dark"
                  defaultChecked={this.state.theme === "dark"}
                />{" "}
                <label
                  htmlFor="dark"
                  id={this.props.theme === "dark" ? "currentTheme" : null}
                >
                  Dark
                </label>
              </div>
            </div>
          </form>
        </div>
      </SettingsStyled>
    );
  }
}

Settings.propTypes = {
  updateTheme: PropTypes.func,
  theme: PropTypes.string
};

export default Settings;
