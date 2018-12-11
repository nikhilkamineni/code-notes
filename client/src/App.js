import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

// Components
import Sidebar from "./components/sidebar";
import NotesList from "./components/notes-list";
import CreateNote from "./components/create-note";
import NoteDetails from "./components/note-details";
import EditNote from "./components/edit-note";
import DeleteModal from "./components/delete-modal";
import Signup from "./components/signup";
import Login from "./components/login";

import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

// Styles for App Component
const AppStyled = styled.div`
  display: flex;
  flex-flow: row no-wrap;
  height: auto;

  .Content {
    height: 80%;
    width: 100%;
  }
`;

// App Component starts here
class App extends Component {
  state = {
    showingSignup: false,
    showingLogin: true,
    viewingNotes: false,
    creatingNote: false,
    editingNote: false,
    showingNoteDetails: false,
    authenticated: false,
    username: "",
    userId: "",
    notes: [],
    noteDetails: {
      title: "",
      content: "",
      _id: ""
    }
  };

  componentDidMount() {
    try {
      this.getNotes();
      this.setState({ authenticated: true, viewingNotes: true });
    } catch (err) {
      console.error(err); // eslint-disable-line
    }
  }

  loginUser = userInfo => {
    axios
      .post(`${API_URL}/login`, userInfo)
      .then(res => {
        localStorage.setItem("token", res.data.token);
      })
      .then(() => {
        this.setState({ authenticated: true, username: userInfo.username });
      })
      .then(() => {
        this.getNotes();
        this.viewNotes();
      })
      .catch(err => console.error(err)); // eslint-disable-line
  };

  logoutUser = () => {
    localStorage.removeItem("token");
    this.setState({
      showingSignup: false,
      showingLogin: true,
      viewingNotes: false,
      creatingNote: false,
      editingNote: false,
      showingNoteDetails: false,
      authenticated: false,
      username: "",
      userId: "",
      notes: [],
      noteDetails: {
        title: "",
        content: "",
        _id: ""
      }
    });
  };

  showLogin = () => {
    this.setState({ showingLogin: true, showingSignup: false });
  };

  showSignup = () => {
    this.setState({ showingSignup: true, showingLogin: false });
  };

  getNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const header = { headers: { Authorization: token } };
      const response = await axios.get(`${API_URL}/user`, header);
      this.setState({ notes: response.data.notes, userId: response.data._id });
    } catch (err) {
      console.error(err); // eslint-disable-line
    }
  };

  viewNotes = () => {
    this.setState({
      viewingNotes: true,
      creatingNote: false,
      showingNoteDetails: false,
      editingNote: false,
      deletingNote: false
    });
  };

  createNewNoteForm = () => {
    this.setState({
      viewingNotes: false,
      creatingNote: true,
      showingNoteDetails: false,
      editingNote: false,
      deletingNote: false
    });
  };

  showNoteDetails = id => {
    const noteToView = this.state.notes.find(note => note._id === id);
    this.setState({
      noteDetails: { ...noteToView },
      viewingNotes: false,
      creatingNote: false,
      showingNoteDetails: true,
      editingNote: false,
      deletingNote: false
    });
  };

  showNoteEditForm = () => {
    this.setState({
      viewingNotes: false,
      creatingNote: false,
      showingNoteDetails: false,
      editingNote: true,
      deletingNote: false
    });
  };

  showDeleteModal = () => {
    this.setState({ deletingNote: true });
  };

  closeDeleteModal = () => {
    this.setState({ deletingNote: false });
  };

  saveNewNote = note => {
    const token = localStorage.getItem("token");
    const header = { headers: { Authorization: token } };
    note.createdBy = this.state.userId;
    axios
      .post(`${API_URL}/notes`, note, header)
      .then(res => {
        this.setState({ notes: [...this.state.notes, res.data] });
        this.getNotes();
      })
      .then(() => this.viewNotes())
      .catch(err => console.error(err)); // eslint-disable-line
  };

  updateNote = updatedNote => {
    const token = localStorage.getItem("token");
    const header = { headers: { Authorization: token } };
    const updatedNoteInfo = {
      title: updatedNote.title,
      content: updatedNote.content
    };
    axios
      .put(`${API_URL}/notes/${updatedNote._id}`, updatedNoteInfo, header)
      .then(res => {
        this.setState({ noteDetails: { ...res.data.updatedNote } });
      })
      .then(() => this.getNotes())
      .then(() =>
        this.setState({ editingNote: false, showingNoteDetails: true })
      )
      .catch(err => console.error(err)); // eslint-disable-line
  };

  deleteNote = () => {
    const token = localStorage.getItem("token");
    const header = { headers: { Authorization: token } };
    let id = this.state.noteDetails._id;
    axios
      .delete(`${API_URL}/notes/${id}`, header)
      .then(() => {
        let updatedNotes = this.state.notes.filter(
          note => note._id !== this.state.noteDetails._id
        );
        this.setState({ notes: updatedNotes });
        this.viewNotes();
      })
      .catch(err => console.error(err)); // eslint-disable-line
  };

  render() {
    return (
      <AppStyled className="App">
        <Sidebar
          viewNotes={this.viewNotes}
          createNewNoteForm={this.createNewNoteForm}
          authenticated={this.state.authenticated}
          showingLogin={this.state.showingLogin}
          showingSignup={this.state.showingSignup}
          showLogin={this.showLogin}
          showSignup={this.showSignup}
          logoutUser={this.logoutUser}
        />

        <div className="Content">
          {!this.state.authenticated && this.state.showingLogin && (
            <Login loginUser={this.loginUser} />
          )}

          {!this.state.authenticated && this.state.showingSignup && (
            <Signup showLogin={this.showLogin} />
          )}

          {this.state.authenticated && this.state.viewingNotes && (
            <NotesList
              notes={this.state.notes}
              showNoteDetails={this.showNoteDetails}
            />
          )}

          {this.state.authenticated && this.state.creatingNote && (
            <CreateNote
              getNextId={this.getNextId}
              saveNewNote={this.saveNewNote}
            />
          )}

          {this.state.authenticated && this.state.showingNoteDetails && (
            <NoteDetails
              noteDetails={this.state.noteDetails}
              showNoteEditForm={this.showNoteEditForm}
              showDeleteModal={this.showDeleteModal}
              style={{ padding: "0" }}
            />
          )}

          {this.state.authenticated && this.state.editingNote && (
            <EditNote
              noteDetails={this.state.noteDetails}
              updateNote={this.updateNote}
              showNoteEditForm={this.showNoteEditForm}
              showNoteDetails={this.showNoteDetails}
            />
          )}
        </div>

        {this.state.authenticated && this.state.deletingNote && (
          <DeleteModal
            deleteNote={this.deleteNote}
            closeDeleteModal={this.closeDeleteModal}
          />
        )}
      </AppStyled>
    );
  }
} // App Component ends here

export default App;
