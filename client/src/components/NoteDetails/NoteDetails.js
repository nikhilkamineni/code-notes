import PropTypes from "prop-types";
import React, { Component } from "react";
// import ReactMarkdown from "react-markdown";
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

import NoteDetailsStyled from "./NoteDetails.styled.js";

const languages = [
  "markdown",
  "xml",
  "javascript",
  "clike",
  "css",
  "htmlmixed"
];

// Note Details Component
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

  componentDidMount() {
    window.scrollTo(0, 0);
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
        <div className="NoteDetails__Actions">
          <button onClick={this.props.showNoteEditForm}>Edit</button>
          <button onClick={this.props.showDeleteModal}>Delete</button>
        </div>

        <div className="CreateNote__Options">

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
          value={this.state.content}
          options={{
            mode: this.state.language,
            theme: cmTheme,
            lineNumbers: this.state.lineNumbers,
            readOnly: "nocursor"
          }}
          onChange={this.handleContentInput}
        />
        {/* <ReactMarkdown */}
        {/*   source={this.state.content} */}
        {/*   className="NoteDetails__Content" */}
        {/* /> */}
        <footer>
          <div>{this.state.language}</div>
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
