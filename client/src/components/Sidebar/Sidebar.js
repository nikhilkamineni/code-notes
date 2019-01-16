import PropTypes from "prop-types";
import React from "react";
import { Link } from "@reach/router";

import SidebarStyled from "./Sidebar.styled.js";

const Sidebar = props => {
  return (
    <SidebarStyled className="Sidebar" theme={props.theme}>
      <div className="Sidebar__spacer" />
      <div className={"Sidebar__Logo"}>
        <h1>{"{ codex }"}</h1>
      </div>

      {props.authenticated && (
        <div id="Sidebar__Menu">
          <Link id="Sidebar__ViewNotes" to="/notes-list">
            View Notes
          </Link>

          <Link id="Sidebar__CreateNotes" to="/note-create">
            + Create Note
          </Link>

          <Link id="Sidebar__Settings" to="/settings">
            Settings
          </Link>

          <button id="Sidebar__Logout" onClick={props.logoutUser}>
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
