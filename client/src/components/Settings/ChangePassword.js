import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000/api";

class ChangePassword extends Component {
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

  render() {
    return (
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
          value="submit"
          className="ChangePasswordForm__Submit SubmitButton"
        />
        <p id="ChangePasswordForm__message">
          {this.state.changePasswordMessage}
        </p>
        <p id="ChangePasswordForm__error">{this.state.changePasswordError}</p>
      </form>
    );
  }
}

export default ChangePassword;
