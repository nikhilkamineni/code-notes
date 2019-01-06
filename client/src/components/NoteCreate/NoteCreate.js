import PropTypes from "prop-types";
import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import NoteCreateStyled from "./NoteCreate.styled.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/xq-light.css";

import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/clike/clike";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";

const languages = [
  "xml",
  "javascript",
  "markdown",
  "clike",
  "css",
  "htmlmixed"
];

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

  handleContentInput = (editor, data, value) => {
    this.setState({ content: value });
  };

  handleSave = () => {
    const { title, description, content } = this.state;
    this.props.saveNewNote({ title, description, content });
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
        <select id="CreateNote__LanguageDropDown" name="language">
          {languages.map(lang => (
            <option value={lang} key={lang}>
              {lang}
            </option>
          ))}
        </select>
        <CodeMirror
          className="CreateNote__ContentInput"
          value="Hello, World!"
          options={{
            mode: "javascript",
            theme: cmTheme,
            lineNumbers: true
          }}
          onChange={this.handleContentInput}
        />
        {/* <textarea */}
        {/*   className="CreateNote__ContentInput" */}
        {/*   type="text" */}
        {/*   placeholder="Content" */}
        {/*   rows="10" */}
        {/*   cols="50" */}
        {/*   name="content" */}
        {/*   value={this.state.content} */}
        {/*   onChange={this.handleContentInput} */}
        {/* /> */}
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
