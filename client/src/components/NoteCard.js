import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";

const NoteStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 200px;
  border: 1px solid rgb(166, 166, 166);
  padding: 10px;
  margin: 10px;
  background-color: rgb(255, 255, 255);

  &:hover {
    border: 1px solid black;
    cursor: pointer;
  }

  h4 {
    margin: 3px 3px 0 3px;
    color: #000000;
  }

  p {
    font-size: 0.8rem;
    line-height: 25px;
    margin: 0 3px;
    white-space: pre-line;
  }
`;

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
      <NoteStyled
        className="NotePreview"
        onClick={() => {
          this.props.showNoteDetails(this.props.note._id);
        }}
      >
        <h4>{this.props.note.title}</h4>
        <hr style={{ width: "100%" }} />
        <p>{getNoteContentPreview(this.props.note.description)}</p>
      </NoteStyled>
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
