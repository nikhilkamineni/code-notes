import PropTypes from "prop-types";
import React from "react";

import SettingsStyled from "./Settings.styled.js";
import ChangePassword from "./ChangePassword";
import ChangeTheme from "./ChangeTheme";

const Settings = props => {
  return (
    <SettingsStyled className="Settings" theme={props.theme}>
      <header>
        <h2>Settings</h2>
      </header>

      <div id="Settings__Content">
        <ChangePassword />

        <ChangeTheme updateTheme={props.updateTheme} theme={props.theme} />
      </div>
    </SettingsStyled>
  );
};

Settings.propTypes = {
  updateTheme: PropTypes.func,
  theme: PropTypes.string
};

export default Settings;
