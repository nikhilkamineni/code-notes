import PropTypes from "prop-types";
import React, { Component } from "react";

import Editor from "../Editor/Editor.js";
import NoteCreateStyled from "./NoteCreate.styled.js";

class NoteCreate extends Component {
  state = {
    title: "",
    description: "",
    content: "",
    language: "markdown",
    lineNumbers: true
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleContentInput = (editor, data, value) => {
    this.setState({ content: value });
  };

  handleLineNumbers = e => {
    this.setState({ lineNumbers: e.target.checked });
  };

  handleSave = () => {
    const { title, description, content, language } = this.state;
    this.props.saveNewNote({ title, description, content, language });
  };

  render() {
    const cmTheme = this.props.theme === "dark" ? "darcula" : "xq-light";

    return (
      <NoteCreateStyled theme={this.props.theme}>
        <h2>Create New Note</h2>

        <label className="CreateNote__TitleLabel">Title:</label>
        <input
          className="CreateNote__TitleInput"
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleInput}
        />

        <label className="CreateNote__DescriptionLabel">Description:</label>
        <input
          className="CreateNote__DescriptionInput"
          type="text"
          name="description"
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

        <button onClick={this.handleSave} id="SaveButton">
          Save
        </button>
      </NoteCreateStyled>
    );
  }
} // NoteCreate Component ends

NoteCreate.propTypes = {
  saveNewNote: PropTypes.func,
  theme: PropTypes.string
};

export default NoteCreate;
