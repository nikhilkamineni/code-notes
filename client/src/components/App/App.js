import axios from "axios";
import React, { Component } from "react";
import { Router, navigate } from "@reach/router";

// Components
import NoteCreate from "../NoteCreate/NoteCreate.js";
import DeleteModal from "../DeleteModal/DeleteModal.js";
import NoteEdit from "../NoteEdit/NoteEdit.js";
import Login from "../Login/Login.js";
import NoteDetails from "../NoteDetails/NoteDetails.js";
import NotesList from "../NotesList/NotesList.js";
import Settings from "../Settings/Settings.js";
import Sidebar from "../Sidebar/Sidebar.js";
import Signup from "../Signup/Signup.js";

// App styles
import AppStyled from "./App.styled.js";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000/api";

axios.defaults.withCredentials = true;

// App Component starts here
class App extends Component {
  state = {
    authenticated: false,
    username: "",
    notes: [],
    noteDetails: {
      title: "",
      description: "",
      content: "",
      language: "",
      _id: ""
    }
  };

  componentDidMount() {
    if (localStorage.getItem("token")) this.getNotes();
  }

  getNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const header = { headers: { Authorization: token } };
      const response = await axios.get(`${API_URL}/user`, header);
      if (response.status === 200) {
        this.setState({
          authenticated: true,
          notes: response.data.notes,
          username: response.data.username,
          _id: response.data._id,
          theme: response.data.theme
        });
      }
    } catch (err) {
      console.error(err); // eslint-disable-line
    }
  };

  loginUser = async userInfo => {
    try {
      const response = await axios.post(`${API_URL}/login`, userInfo);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        await this.getNotes();
        await this.setState({ authenticated: true, ...response.data.user });
        navigate("/notes-list");
      }
    } catch (err) {
      console.error(err); // eslint-disable-line
      return err.response.data.error;
    }
  };

  logoutUser = () => {
    localStorage.removeItem("token");
    this.setState({
      authenticated: false,
      username: "",
      notes: [],
      noteDetails: {}
    });
    navigate("/");
  };

  showLogin = () => {
    this.setState({ showingLogin: true, showingSignup: false });
  };

  showSignup = () => {
    this.setState({ showingSignup: true, showingLogin: false });
  };

  showNoteDetails = id => {
    const noteToView = this.state.notes.find(note => note._id === id);
    this.setState({
      noteDetails: { ...noteToView },
      showingNoteDetails: true,
      showingNotesList: false,
      showingNoteCreate: false,
      showingNoteEdit: false,
      showingSettings: false,
      deletingNote: false
    });
  };

  showDeleteModal = () => {
    this.setState({ deletingNote: true });
  };

  closeDeleteModal = () => {
    this.setState({ deletingNote: false });
  };

  saveNewNote = async note => {
    try {
      const token = localStorage.getItem("token");
      const options = { headers: { Authorization: token } };
      note.createdBy = this.state._id;
      const response = await axios.post(`${API_URL}/notes`, note, options);
      this.setState({ notes: [...this.state.notes, response.data] });
      this.showNotesList();
    } catch (err) {
      console.error(err); // eslint-disable-line
    }
  };

  updateNote = async updatedNote => {
    try {
      const token = localStorage.getItem("token");
      const header = { headers: { Authorization: token } };

      const response = await axios.put(
        `${API_URL}/notes/${updatedNote._id}`,
        updatedNote,
        header
      );

      this.setState({
        showingNoteEdit: false,
        showingNoteDetails: true,
        noteDetails: { ...response.data.updatedNote }
      });
    } catch (err) {
      console.error(err); // eslint-disable-line
    }
  };

  updateTheme = async theme => {
    try {
      const token = localStorage.getItem("token");
      const header = { headers: { Authorization: token } };

      const response = await axios.put(
        `${API_URL}/user/change-theme`,
        { theme },
        header
      );
      if (response.status === 200) {
        await this.setState({ theme: response.data.theme });
      }
    } catch (err) {
      console.error('Failed to change theme!'); //eslint-disable-line
    }
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
        this.showNotesList();
      })
      .catch(err => console.error(err)); // eslint-disable-line
  };

  render() {
    return (
      <AppStyled className="App" theme={this.state.theme}>
        {this.state.authenticated ? (
          <>
            <Sidebar
              authenticated={this.state.authenticated}
              logoutUser={this.logoutUser}
              showNoteCreateForm={this.showNoteCreateForm}
              showNotesList={this.showNotesList}
              showSettings={this.showSettings}
              theme={this.state.theme}
            />
            <div className="Content">
              <Router>
                <NotesList
                  path="notes-list"
                  notes={this.state.notes}
                  showNoteDetails={this.showNoteDetails}
                  theme={this.state.theme}
                />

                <NoteCreate
                  path="note-create"
                  getNextId={this.getNextId}
                  saveNewNote={this.saveNewNote}
                  theme={this.state.theme}
                />

                <NoteDetails
                  path="note-details/:id"
                  showDeleteModal={this.showDeleteModal}
                  noteDetails={this.state.noteDetails}
                  showNoteEditForm={this.showNoteEditForm}
                  style={{ padding: "0" }}
                  theme={this.state.theme}
                />

                <NoteEdit
                  path="note-edit/:id"
                  noteDetails={this.state.noteDetails}
                  updateNote={this.updateNote}
                  showNoteEditForm={this.showNoteEditForm}
                  showNoteDetails={this.showNoteDetails}
                  theme={this.state.theme}
                />

                <Settings
                  path="settings"
                  showSettings={this.showSettings}
                  updateTheme={this.updateTheme}
                  theme={this.state.theme}
                />
              </Router>
            </div>
          </>
        ) : (
          <Router>
            <Login
              path="/"
              loginUser={this.loginUser}
              theme={this.state.theme}
              showSignup={this.showSignup}
            />

            <Signup
              path="signup"
              loginUser={this.loginUser}
              theme={this.state.theme}
              showLogin={this.showLogin}
            />
          </Router>
        )}

        {this.state.authenticated && this.state.deletingNote && (
          <DeleteModal
            closeDeleteModal={this.closeDeleteModal}
            deleteNote={this.deleteNote}
            theme={this.state.theme}
          />
        )}
      </AppStyled>
    );
  }
} // App Component ends here

export default App;
