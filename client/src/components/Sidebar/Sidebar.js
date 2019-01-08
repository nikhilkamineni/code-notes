import PropTypes from "prop-types";
import React from "react";

import SidebarStyled from "./Sidebar.styled.js";

const Sidebar = props => {
  return (
    <SidebarStyled className="Sidebar" theme={props.theme}>
      <div className={"Sidebar__Logo"}>
        <h1>{"{ codex }"}</h1>
      </div>

      {props.authenticated && (
        <div className="Sidebar__Menu">
          <button className="Sidebar__ViewNotes" onClick={props.showNotesList}>
            View Notes
          </button>
          <button
            className="Sidebar__CreateNotes"
            onClick={props.showNoteCreateForm}
          >
            + Create Note
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
  showingSignup: PropTypes.bool,
  theme: PropTypes.string
};

export default Sidebar;
