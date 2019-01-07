import PropTypes from "prop-types";
import React, { Component } from "react";
// import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/xq-light.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/clike/clike";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";

import Editor from "../Editor/Editor.js";
import NoteCreateStyled from "./NoteCreate.styled.js";

// const languages = [
//   "markdown",
//   "xml",
//   "javascript",
//   "clike",
//   "css",
//   "htmlmixed"
// ];

// NoteCreate Component starts
class NoteCreate extends Component {
  state = {
    title: "",
    description: "",
    content: "",
    language: "markdown",
    lineNumbers: true
  };

  handleTitleInput = e => {
    this.setState({ title: e.target.value });
  };

  handleDescriptionInput = e => {
    this.setState({ description: e.target.value });
  };

  handleContentInput = (editor, data, value) => {
    this.setState({ content: value });
  };

  handleLanguageDropdown = e => {
    this.setState({ language: e.target.value });
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

        <Editor
          value={this.state.content}
          options={{
            mode: this.state.language,
            theme: cmTheme,
            lineNumbers: this.state.lineNumbers
          }}
          handleLanguageDropdown={this.handleLanguageDropdown}
          handleLineNumbers={this.handleLineNumbers}
          lineNumbers={this.state.lineNumbers}
          handleContentInput={this.handleContentInput}
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
