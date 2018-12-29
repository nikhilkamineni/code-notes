import PropTypes from "prop-types";
import React, { Component } from "react";

import NoteCreateStyled from "./NoteCreate.styled.js";

// NoteCreate Component starts
class NoteCreate extends Component {
  state = {
    title: "",
    description: "",
    content: ""
  };

  handleTitleInput = e => {
    this.setState({ title: e.target.value });
  };

  handleDescriptionInput = e => {
    this.setState({ description: e.target.value });
  };

  handleContentInput = e => {
    this.setState({ content: e.target.value });
  };

  handleSave = () => {
    const { title, description, content } = this.state;
    this.props.saveNewNote({ title, description, content });
  };

  render() {
    return (
      <NoteCreateStyled>
        <h2>Create New Note:</h2>
        <input
          className="CreateNote__TitleInput"
          type="text"
          placeholder="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleTitleInput}
        />
        <input
          className="CreateNote__DescriptionInput"
          type="text"
          placeholder="Description"
          name="description"
          value={this.state.description}
          onChange={this.handleDescriptionInput}
        />
        <textarea
          className="CreateNote__ContentInput"
          type="text"
          placeholder="Content"
          rows="10"
          cols="50"
          name="content"
          value={this.state.content}
          onChange={this.handleContentInput}
        />
        <button onClick={this.handleSave}>Save</button>
      </NoteCreateStyled>
    );
  }
} // NoteCreate Component ends

NoteCreate.propTypes = {
  saveNewNote: PropTypes.func
};

export default NoteCreate;
