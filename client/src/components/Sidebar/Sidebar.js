import PropTypes from "prop-types";
import React from "react";
import { Link } from "@reach/router";

import SidebarStyled from "./Sidebar.styled.js";

const Sidebar = props => {
  return (
    <SidebarStyled className="Sidebar" theme={props.theme}>
      <div className={"Sidebar__Logo"}>
        <h1>{"{ codex }"}</h1>
      </div>

      {props.authenticated && (
        <div id="Sidebar__Menu">
          <Link id="Sidebar__ViewNotes" className="Sidebar__Link" to="/">
            View Notes
          </Link>

          <Link
            id="Sidebar__CreateNotes"
            className="Sidebar__Link"
            to="/note/create"
          >
            + Create Note
          </Link>

          <Link id="Sidebar__Settings" className="Sidebar__Link" to="/settings">
            Settings
          </Link>

          <button
            id="Sidebar__Logout"
            className="Sidebar__Link"
            onClick={props.logoutUser}
          >
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
