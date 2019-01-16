import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "@reach/router";

import Editor from "../Editor/Editor.js";
import NoteDetailsStyled from "./NoteDetails.styled.js";

class NoteDetails extends Component {
  state = {
    title: this.props.noteDetails.title,
    description: this.props.noteDetails.description,
    language: this.props.noteDetails.language,
    content: this.props.noteDetails.content,
    _id: this.props.noteDetails._id,
    createdOn: this.props.noteDetails.createdOn,
    lineNumbers: true
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.state._id) {
      const id = this.props.uri.slice(6);
      await this.props.showNoteDetails(id);
    }
  }

  handleLineNumbers = e => {
    this.setState({ lineNumbers: e.target.checked });
  };

  render() {
    let date = new Date(this.state.createdOn).toLocaleString();
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
            readOnly: "nocursor"
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
  noteDetails: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    language: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string,
    createdOn: PropTypes.string
  }),
  showDeleteModal: PropTypes.func,
  showNoteEditForm: PropTypes.func,
  theme: PropTypes.string
};

export default NoteDetails;
