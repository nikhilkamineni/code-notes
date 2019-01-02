// import PropTypes from "prop-types";
import axios from "axios";
import React, { Component } from "react";

import SettingsStyled from "./Settings.styled.js";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

class Settings extends Component {
  updatePassword = async password => {
    try {
      const token = localStorage.getItem("token");
      const header = { headers: { Authorization: token } };

      const response = await axios.put(
        `${API_URL}/user/change-password`,
        { password },
        header
      );
      if (response.status === 200)
        console.log("Password was change successfully!");
    } catch (err) {
      console.error("Failed to change password!");
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const confirmNewPassword = e.target.newPassword.value;
    if (newPassword === confirmNewPassword) {
      // TODO: Show feedback after hitting submit button
      await this.updatePassword(newPassword);
    } else {
      // TODO: Improve error handling
      console.error("Paswords do not match!");
    }
  };

  render() {
    return (
      <SettingsStyled className="Settings">
        <header>
          <h2>Settings</h2>
        </header>
        <div className="Settings__Content">
          <form
            className="Settings__ChangePasswordForm"
            onSubmit={this.handleSubmit}
          >
            <h3 className="ChangePasswordForm__Label">Change Password</h3>
            <input
              className="ChangePasswordForm__Input"
              type="text"
              name="newPassword"
              placeholder="New password"
            />
            <input
              className="ChangePasswordForm__Input"
              type="text"
              name="confirmNewPassword"
              placeholder="Confrim new password"
            />
            <input
              type="submit"
              className="ChangePasswordForm__Submit SubmitButton"
            />
          </form>
          <form className="Settings__Theme">
            <h3>Theme</h3>
            <div className="Theme__option">
              <input type="radio" name="theme" value="light" /> Light <br />
            </div>
            <div className="Theme__option">
              <input type="radio" name="theme" value="dark" /> Dark <br />
            </div>
          </form>
        </div>
      </SettingsStyled>
    );
  }
}

// Settings.propTypes = {}

export default Settings;
