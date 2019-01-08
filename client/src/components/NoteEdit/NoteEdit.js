import PropTypes from "prop-types";
import React, { Component } from "react";

import Editor from "../Editor/Editor.js";
import NoteEditStyled from "./NoteEdit.styled.js";

class NoteEdit extends Component {
  state = {
    title: this.props.noteDetails,
    description: this.props.noteDetails.description,
    language: this.props.noteDetails.language,
    content: this.props.noteDetails.content,
    _id: this.props.noteDetails._id,
    lineNumbers: true
  };

  componentDidMount() {
    this.setState({ ...this.props.noteDetails });
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleContentInput = (editor, data, value) => {
    this.setState({ content: value });
  };

  handleLineNumbers = e => {
    this.setState({ lineNumbers: e.target.checked });
  };

  handleUpdate = () => {
    const { title, description, language, content, _id } = this.state;
    this.props.updateNote({ title, description, language, content, _id });
  };

  render() {
    const cmTheme = this.props.theme === "dark" ? "darcula" : "xq-light";

    return (
      <NoteEditStyled className="NoteEdit" theme={this.props.theme}>
        <h2>Edit Note:</h2>

        <label className="NoteEdit__TitleLabel">Title:</label>
        <input
          className="NoteEdit__TitleInput"
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleInput}
        />

        <label className="NoteEdit__DescriptionLabel">Description:</label>
        <input
          className="NoteEdit__DescriptionInput"
          type="text"
          name="description"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleInput}
        />

        <Editor
          handleLanguageDropdown={this.handleInput}
          handleLineNumbers={this.handleLineNumbers}
          handleContentInput={this.handleContentInput}
          language={this.state.language}
          lineNumbers={this.state.lineNumbers}
          value={this.state.content}
          theme={this.props.theme}
          options={{
            mode: this.state.language,
            theme: cmTheme,
            lineNumbers: this.state.lineNumbers,
            matchBrackets: true,
            autoCloseBrackets: true,
            matchTags: true,
            autoCloseTags: true
          }}
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
    language: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string
  }),
  updateNote: PropTypes.func,
  theme: PropTypes.string
};

export default NoteEdit;
