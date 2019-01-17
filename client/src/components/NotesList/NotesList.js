import PropTypes from "prop-types";
import React, { Component } from "react";

import NoteCard from "../NoteCard/NoteCard.js";
import NotesListStyled from "./NotesList.styled.js";

// NotesList component starts
class NotesList extends Component {
  state = {
    notesFiltered: []
  };

  handleSearch = event => {
    if (event.target.value.length > 0) {
      let filteredNotes = this.props.notes.filter(note => {
        let searchTerms = event.target.value.toLowerCase().split(" ");
        let containsTerm = true;
        searchTerms.forEach(term => {
          if (note.title.toLowerCase().includes(term) !== true) {
            containsTerm = false;
          }
        });
        return containsTerm;
      });
      this.setState({ notesFiltered: filteredNotes });
    } else {
      this.setState({ notesFiltered: this.props.notes });
    }
  };

  componentDidMount() {
    this.setState({ notesFiltered: this.props.notes });
  }

  render() {
    return (
      <NotesListStyled className="NotesList" theme={this.props.theme}>
        <header className="NotesList__header">
          <h2>Your Notes:</h2>
          <div id="NotesList__searchContainer">
            <input
              onChange={this.handleSearch}
              value={this.state.searchInput}
              placeholder="Search Titles..."
            />
          </div>
        </header>
        <div id="NotesList__body">
          {this.state.notesFiltered && this.state.notesFiltered.length > 0 ? (
            this.state.notesFiltered.map(note => {
              return (
                <NoteCard
                  key={note._id}
                  note={note}
                  showNoteDetails={this.props.showNoteDetails}
                  theme={this.props.theme}
                />
              );
            })
          ) : (
            <p style={{ padding: "15px" }}>You have no notes yet!</p>
          )}
        </div>
      </NotesListStyled>
    );
  }
} // COMPONENT ENDS HERE

NotesList.propTypes = {
  showNoteDetails: PropTypes.func,
  notes: PropTypes.array,
  theme: PropTypes.string
};

export default NotesList;
