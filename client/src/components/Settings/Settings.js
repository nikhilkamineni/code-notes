import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";

import SettingsStyled from "./Settings.styled.js";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000/api";

class Settings extends Component {
  state = {
    changePasswordMessage: null,
    changePasswordError: null
  };

  handleChangePassword = async e => {
    e.preventDefault();
    this.setState({ changePasswordMessage: null, changePasswordError: null });
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
          <ChangePasswordForm
            handleChangePassword={this.handleChangePassword}
            changePasswordMessage={this.state.changePasswordMessage}
            changePasswordError={this.state.changePasswordError}
          />

          <ChangeThemeForm
            handleChangeTheme={this.handleChangeTheme}
            theme={this.props.theme}
          />
        </div>
      </SettingsStyled>
    );
  }
}

const ChangePasswordForm = props => {
  return (
    <form
      id="Settings__ChangePasswordForm"
      onSubmit={props.handleChangePassword}
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
        value="submit"
        className="ChangePasswordForm__Submit SubmitButton"
      />
      <p id="ChangePasswordForm__message">{props.changePasswordMessage}</p>
      <p id="ChangePasswordForm__error">{props.changePasswordError}</p>
    </form>
  );
};

const ChangeThemeForm = props => {
  return (
    <form className="Settings__Theme" onChange={props.handleChangeTheme}>
      <h3>Theme</h3>
      <div id="Theme__Content">
        <div className="Theme__option">
          <input
            id="light"
            type="radio"
            name="theme"
            value="light"
            defaultChecked={props.theme === "light"}
            checked={props.theme === "light"}
          />{" "}
          <label
            htmlFor="light"
            id={props.theme === "light" ? "currentTheme" : null}
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
            defaultChecked={props.theme === "dark"}
            checked={props.theme === "dark"}
          />{" "}
          <label
            htmlFor="dark"
            id={props.theme === "dark" ? "currentTheme" : null}
          >
            Dark
          </label>
        </div>
      </div>
    </form>
  );
};

ChangePasswordForm.propTypes = {
  handleChangePassword: PropTypes.func,
  changePasswordMessage: PropTypes.string,
  changePasswordError: PropTypes.string
};

ChangeThemeForm.propTypes = {
  handleChangeTheme: PropTypes.func,
  theme: PropTypes.string
};

Settings.propTypes = {
  updateTheme: PropTypes.func,
  theme: PropTypes.string
};

export default Settings;
