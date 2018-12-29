import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

import NoteDetailsStyled from "./NoteDetails.styled.js";

// Note Details Component
class NoteDetails extends Component {
  state = {
    title: this.props.noteDetails.title,
    description: this.props.noteDetails.description,
    content: this.props.noteDetails.content,
    _id: this.props.noteDetails._id,
    createdOn: this.props.noteDetails.createdOn
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let date = new Date(this.state.createdOn).toLocaleString();
    return (
      <NoteDetailsStyled className="NoteDetails">
        <header className="NoteDetails__Header">
          <h2 className="Header__Title">{this.state.title}</h2>
          <div className="Header__Actions">
            <button onClick={this.props.showNoteEditForm}>Edit</button>
            <button onClick={this.props.showDeleteModal}>Delete</button>
          </div>
        </header>
        <p className="NoteDetails__Description">{this.state.description}</p>
        <ReactMarkdown
          source={this.state.content}
          className="NoteDetails__Content"
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
    content: PropTypes.string,
    _id: PropTypes.string,
    createdOn: PropTypes.string
  }),
  showDeleteModal: PropTypes.func,
  showNoteEditForm: PropTypes.func
};

export default NoteDetails;
