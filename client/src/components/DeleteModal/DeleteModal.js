import PropTypes from "prop-types";
import React from "react";

import DeleteModalStyled from "./DeleteModal.styled.js";

// DeleteModal Component
const DeleteModal = props => {
  return (
    <DeleteModalStyled theme={props.theme}>
      <div className="DeleteModalDialog">
        <h3>Are you sure you want to delete this?</h3>
        <div className="DeleteModalButtons">
          <button className="DeleteButton" onClick={props.deleteNote}>
            Delete
          </button>
          <button className="NoButton" onClick={props.closeDeleteModal}>
            No
          </button>
        </div>
      </div>
    </DeleteModalStyled>
  );
};

DeleteModal.propTypes = {
  deleteNote: PropTypes.func,
  closeDeleteModal: PropTypes.func,
  theme: PropTypes.string
};

export default DeleteModal;
