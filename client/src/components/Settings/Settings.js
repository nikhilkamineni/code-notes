import PropTypes from "prop-types";
import React, { Component } from "react";

import SettingsStyled from "./Settings.styled.js";
import ChangePassword from "./ChangePassword";
import ChangeTheme from "./ChangeTheme";

class Settings extends Component {
  render() {
    return (
      <SettingsStyled className="Settings" theme={this.props.theme}>
        <header>
          <h2>Settings</h2>
        </header>

        <div id="Settings__Content">
          <ChangePassword />

          <ChangeTheme
            updateTheme={this.props.updateTheme}
            theme={this.props.theme}
          />
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
