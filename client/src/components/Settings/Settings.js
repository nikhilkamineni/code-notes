import PropTypes from "prop-types";
import React, { Component } from "react";

import SettingsStyled from "./Settings.styled.js";
import ChangePassword from "./ChangePassword";
import ChangeTheme from "./ChangeTheme";

class Settings extends Component {
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
          <ChangePassword />

          <ChangeTheme
            handleChangeTheme={this.handleChangeTheme}
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
