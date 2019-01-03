import PropTypes from "prop-types";
import React, { Component } from "react";

import NoteEditStyled from "./NoteEdit.styled.js";

// NoteEdit Component
class NoteEdit extends Component {
  state = {
    title: this.props.noteDetails,
    description: this.props.noteDetails.description,
    content: this.props.noteDetails.content,
    _id: this.props.noteDetails._id
  };

  componentDidMount() {
    this.setState({ ...this.props.noteDetails });
  }

  handleContentInput = e => {
    this.setState({ content: e.target.value });
  };

  handleDescriptionInput = e => {
    this.setState({ description: e.target.value });
  };

  handleTitleInput = e => {
    this.setState({ title: e.target.value });
  };

  handleUpdate = () => {
    this.props.updateNote({ ...this.state });
  };

  render() {
    return (
      <NoteEditStyled className="NoteEdit" theme={this.props.theme}>
        <h2>Edit Note:</h2>
        <input
          className="NoteEdit__TitleInput"
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleTitleInput}
        />
        <input
          className="NoteEdit__DescriptionInput"
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleDescriptionInput}
        />
        <textarea
          className="NoteEdit__ContentInput"
          type="text"
          cols="50"
          rows="10"
          placeholder="Content"
          value={this.state.content}
          onChange={this.handleContentInput}
        />
        <button onClick={this.handleUpdate}>Update</button>
      </NoteEditStyled>
    );
  }
} // Edit Note Component

NoteEdit.propTypes = {
  noteDetails: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string
  }),
  updateNote: PropTypes.func,
  theme: PropTypes.string
};

export default NoteEdit;
