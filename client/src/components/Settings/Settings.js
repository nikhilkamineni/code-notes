// import PropTypes from "prop-types";
import React, { Component } from "react";

import SettingsStyled from "./Settings.styled.js";

class Settings extends Component {
  state = {};

  render() {
    return (
      <SettingsStyled className="Settings">
        <header>
          <h2>Settings</h2>
        </header>
        <form className="Settings__ChangePasswordForm">
          <h3 className="ChangePasswordForm__Label">Change password</h3>
          <input
            type="text"
            name="currentPassword"
            placeholder="Current password"
          />
          <input type="text" name="newPassword" placeholder="New password" />
          <input
            type="text"
            name="confirmNewPassword"
            placeholder="Confrim new password"
          />
        </form>
      </SettingsStyled>
    );
  }
}

// Settings.propTypes = {}

export default Settings;
