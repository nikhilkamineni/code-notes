import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { navigate } from "@reach/router";

import Editor from "../Editor/Editor.js";
import NoteEditStyled from "./NoteEdit.styled.js";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000/api";

class NoteEdit extends Component {
  state = {
    title: this.props.title,
    description: this.props.description,
    language: this.props.language,
    content: this.props.content,
    _id: this.props._id,
    lineNumbers: true
  };

  async componentDidMount() {
    if (!this.state._id) {
      const id = this.props.uri.slice(11); // get the note id from the url param
      const token = localStorage.getItem("token");
      const options = { headers: { Authorization: token } };
      const response = await axios.get(`${API_URL}/notes/${id}`, options);
      this.setState({ ...response.data });
    }
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

  handleUpdate = async () => {
    const { title, description, language, content, _id } = this.state;
    await this.props.updateNote({ title, description, language, content, _id });
    navigate(`/note/${this.state._id}`);
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
  updateNote: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  language: PropTypes.string,
  content: PropTypes.string,
  _id: PropTypes.string,
  theme: PropTypes.string,
  uri: PropTypes.string
};

export default NoteEdit;
