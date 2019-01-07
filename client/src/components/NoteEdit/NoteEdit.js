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

import NoteEditStyled from "./NoteEdit.styled.js";

const languages = [
  "markdown",
  "xml",
  "javascript",
  "clike",
  "css",
  "htmlmixed"
];

// NoteEdit Component
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

  handleTitleInput = e => {
    this.setState({ title: e.target.value });
  };

  handleDescriptionInput = e => {
    this.setState({ description: e.target.value });
  };

  handleLanguageDropdown = e => {
    this.setState({ language: e.target.value });
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

        <div className="NoteEdit__Options">
          <select
            className="Options__LanguageDropDown"
            name="language"
            onChange={this.handleLanguageDropdown}
          >
            {languages.map(lang => (
              <option
                value={lang}
                key={lang}
                selected={this.state.language === lang}
              >
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
          className="NoteEdit__ContentInput"
          value={this.state.content}
          options={{
            mode: this.state.language,
            theme: cmTheme,
            lineNumbers: this.state.lineNumbers
          }}
          onChange={this.handleContentInput}
        />
        {/* <textarea */}
        {/*   className="NoteEdit__ContentInput" */}
        {/*   type="text" */}
        {/*   cols="50" */}
        {/*   rows="10" */}
        {/*   placeholder="Content" */}
        {/*   value={this.state.content} */}
        {/*   onChange={this.handleContentInput} */}
        {/* /> */}
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
