import PropTypes from "prop-types";
import React from "react";

import SidebarStyled from "./Sidebar.styled.js";

// Sidebar Component
const Sidebar = props => {
  return (
    <SidebarStyled className="Sidebar">
      <div className={"Sidebar__Logo"}>
        <h1 className="Logo__TopLine">{"Code"}</h1>
        <h1 className="Logo__BottomLine">{"Notes"}</h1>
      </div>
      {!props.authenticated && props.showingLogin && !props.showingSignup && (
        <button onClick={props.showSignup}>Sign Up</button>
      )}

      {!props.authenticated && props.showingSignup && !props.showingLogin && (
        <button onClick={props.showLogin}>Login</button>
      )}

      {props.authenticated && (
        <div>
          <button className="Sidebar__ViewNotes" onClick={props.showNotesList}>
            View Your Notes
          </button>
          <button
            className="Sidebar__CreateNotes"
            onClick={props.showNoteCreateForm}
          >
            + Create New Note
          </button>
          <button className="Sidebar__Settings" onClick={props.showSettings}>
            Settings
          </button>
          <button className="Sidebar__Logout" onClick={props.logoutUser}>
            Logout
          </button>
        </div>
      )}
    </SidebarStyled>
  );
};

Sidebar.propTypes = {
  authenticated: PropTypes.bool,
  logoutUser: PropTypes.func,
  showLogin: PropTypes.func,
  showNotesList: PropTypes.func,
  showNoteCreateForm: PropTypes.func,
  showSignup: PropTypes.func,
  showSettings: PropTypes.func,
  showingLogin: PropTypes.bool,
  showingSignup: PropTypes.bool
};

export default Sidebar;
