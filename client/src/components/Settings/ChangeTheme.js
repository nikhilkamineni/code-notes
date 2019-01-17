import PropTypes from "prop-types";
import React from "react";

const ChangeTheme = props => {
  const handleChangeTheme = e => {
    props.updateTheme(e.target.value);
  };

  return (
    <form className="Settings__Theme" onChange={handleChangeTheme}>
      <h3>Theme</h3>
      <div id="Theme__Content">
        <div className="Theme__option">
          <input
            id="light"
            type="radio"
            name="theme"
            value="light"
            defaultChecked={props.theme === "light"}
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

ChangeTheme.propTypes = {
  updateTheme: PropTypes.func,
  theme: PropTypes.string
};

export default ChangeTheme;
