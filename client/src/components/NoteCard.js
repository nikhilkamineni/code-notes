import PropTypes from "prop-types";
import React, { Component } from "react";

import NoteCardStyled from "./NoteCard.styled.js";

const getNoteContentPreview = content => {
  if (!content) return "";
  if (content.length > 130) {
    let contentPreview = content.slice(0, 120);
    return `${contentPreview}...`;
  }
  return content;
};

class Note extends Component {
  render() {
    return (
      <NoteCardStyled
        className="NoteCard"
        onClick={() => {
          this.props.showNoteDetails(this.props.note._id);
        }}
      >
        <h4>{this.props.note.title}</h4>
        <hr style={{ width: "100%" }} />
        <p>{getNoteContentPreview(this.props.note.description)}</p>
      </NoteCardStyled>
    );
  }
}

Note.propTypes = {
  showNoteDetails: PropTypes.func,
  note: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string
  })
};

export default Note;
