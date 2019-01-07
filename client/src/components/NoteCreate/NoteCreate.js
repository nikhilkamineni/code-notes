import PropTypes from "prop-types";
import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/xq-light.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/clike/clike";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";

import NoteCreateStyled from "./NoteCreate.styled.js";

const languages = [
  "markdown",
  "xml",
  "javascript",
  "clike",
  "css",
  "htmlmixed"
];

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

        <div className="CreateNote__Options">
          <select
            className="Options__LanguageDropDown"
            name="language"
            onChange={this.handleLanguageDropdown}
          >
            {languages.map(lang => (
              <option value={lang} key={lang}>
                {lang}
              </option>
            ))}
          </select>

          <div className="Options__LineNumbers">
            <label>Line Numbers</label>
            <input
              defaultChecked={this.state.lineNumbers}
              type="checkbox"
              name="lineNumbers"
              onClick={this.handleLineNumbers}
            />
          </div>
        </div>

        <CodeMirror
          className="CreateNote__ContentInput"
          value="Hello, World!"
          options={{
            mode: this.state.language,
            theme: cmTheme,
            lineNumbers: this.state.lineNumbers
          }}
          onChange={this.handleContentInput}
        />
        <button onClick={this.handleSave}>Save</button>
      </NoteCreateStyled>
    );
  }
} // NoteCreate Component ends

NoteCreate.propTypes = {
  saveNewNote: PropTypes.func,
  theme: PropTypes.string
};

export default NoteCreate;
