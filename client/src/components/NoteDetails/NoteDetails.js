import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "@reach/router";

import Editor from "../Editor/Editor.js";
import NoteDetailsStyled from "./NoteDetails.styled.js";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000/api";

class NoteDetails extends Component {
  state = {
    title: this.props.title,
    description: this.props.description,
    language: this.props.language,
    content: this.props.content,
    _id: this.props._id,
    createdOn: this.props.createdOn,
    lineNumbers: true
  };

  async componentDidMount() {
    window.scrollTo(0, 0);

    // If the component was navigated directly using a url path with
    // note id in parameter, fetch the individual note's info from backend
    if (!this.state._id) {
      const id = this.props.uri.slice(6); // get the note id from the url param
      const token = localStorage.getItem("token");
      const options = { headers: { Authorization: token } };

      const response = await axios.get(`${API_URL}/notes/${id}`, options);
      this.setState({ ...response.data });
    }
  }

  handleLineNumbers = e => {
    this.setState({ lineNumbers: e.target.checked });
  };

  render() {
    const date = new Date(this.state.createdOn).toLocaleString();
    const cmTheme = this.props.theme === "dark" ? "darcula" : "xq-light";

    return (
      <NoteDetailsStyled className="NoteDetails" theme={this.props.theme}>
        <header className="NoteDetails__Header">
          <h2 className="Header__Title">{this.state.title}</h2>
        </header>

        <h3 className="NoteDetails__Description">{this.state.description}</h3>

        <div className="NoteDetails__Options">
          <Link id="edit" to={`/note/edit/${this.state._id}`}>
            Edit
          </Link>
          <button id="delete" onClick={this.props.showDeleteModal}>
            Delete
          </button>
        </div>

        <Editor
          handleLineNumbers={this.handleLineNumbers}
          lineNumbers={this.state.lineNumbers}
          language={this.state.language}
          theme={this.props.theme}
          value={this.state.content}
          options={{
            mode: this.state.language,
            theme: cmTheme,
            lineNumbers: this.state.lineNumbers,
            readOnly: "nocursor",
            viewportMargin: Infinity
          }}
        />

        <footer>
          <div className="Date">{date}</div>
        </footer>
      </NoteDetailsStyled>
    );
  }
} // NoteDetails Component

NoteDetails.propTypes = {
  showDeleteModal: PropTypes.func,
  showNoteEditForm: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  language: PropTypes.string,
  content: PropTypes.string,
  _id: PropTypes.string,
  createdOn: PropTypes.string,
  theme: PropTypes.string,
  uri: PropTypes.string
};

export default NoteDetails;
