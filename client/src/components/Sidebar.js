import PropTypes from "prop-types";
import React from "react";

import SidebarStyled from "./Sidebar.styled.js";

// Sidebar Component
const Sidebar = props => {
  return (
    <SidebarStyled className="Sidebar">
      <h1>{"{ Code Notes }"}</h1>
      {!props.authenticated && props.showingLogin && !props.showingSignup && (
        <button onClick={props.showSignup}>Sign Up</button>
      )}

      {!props.authenticated && props.showingSignup && !props.showingLogin && (
        <button onClick={props.showLogin}>Login</button>
      )}

      {props.authenticated && (
        <div>
          <button onClick={props.showNotesList}>View Your Notes</button>
          <button onClick={props.showNoteCreateForm}>+ Create New Note</button>
          <button onClick={props.logoutUser}>Logout</button>
        </div>
      )}
    </SidebarStyled>
  );
};

Sidebar.propTypes = {
  authenticated: PropTypes.bool,
  logoutUser: PropTypes.func,
  showLogin: PropTypes.func,
  showSignup: PropTypes.func,
  showingLogin: PropTypes.bool,
  showingSignup: PropTypes.bool,
  showNotesList: PropTypes.func,
  showNoteCreateForm: PropTypes.func
};

export default Sidebar;
