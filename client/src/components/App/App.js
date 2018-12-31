import axios from "axios";
import React, { Component } from "react";

// Components
import NoteCreate from "../NoteCreate/NoteCreate.js";
import DeleteModal from "../DeleteModal/DeleteModal.js";
import NoteEdit from "../NoteEdit/NoteEdit.js";
import Login from "../Login/Login.js";
import NoteDetails from "../NoteDetails/NoteDetails.js";
import NotesList from "../NotesList/NotesList.js";
import Sidebar from "../Sidebar/Sidebar.js";
import Signup from "../Signup/Signup.js";

// App styles
import AppStyled from "./App.styled.js";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

axios.defaults.withCredentials = true;

// App Component starts here
class App extends Component {
  state = {
    authenticated: false,
    showingLogin: true,
    showingNoteCreate: false,
    showingNoteDetails: false,
    showingNoteEdit: false,
    showingNotesList: false,
    showingSignup: false,
    username: "",
    userId: "",
    notes: [],
    noteDetails: {
      title: "",
      description: "",
      content: "",
      _id: ""
    }
  };

  componentDidMount() {
    try {
      this.getNotes();
    } catch (err) {
      console.error(err); // eslint-disable-line
    }
  }

  loginUser = async userInfo => {
    try {
      const response = await axios.post(`${API_URL}/login`, userInfo);
      localStorage.setItem("token", response.data.token);
      await this.getNotes();
      this.showNotesList();
      this.setState({ authenticated: true, username: userInfo.username });
    } catch (err) {
      console.error(err); // eslint-disable-line
    }
  };

  logoutUser = () => {
    localStorage.removeItem("token");
    this.setState({
      showingSignup: false,
      showingLogin: true,
      showingNotesList: false,
      showingNoteCreate: false,
      showingNoteEdit: false,
      showingNoteDetails: false,
      authenticated: false,
      username: "",
      userId: "",
      notes: [],
      noteDetails: {
        title: "",
        description: "",
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
      if (response.status === 200) {
        this.setState({
          authenticated: true,
          showingNotesList: true,
          notes: response.data.notes,
          userId: response.data._id
        });
      }
    } catch (err) {
      console.error(err); // eslint-disable-line
    }
  };

  showNotesList = async () => {
    await this.getNotes();
    this.setState({
      showingNotesList: true,
      showingNoteCreate: false,
      showingNoteDetails: false,
      showingNoteEdit: false,
      deletingNote: false
    });
  };

  showNoteCreateForm = () => {
    this.setState({
      showingNotesList: false,
      showingNoteCreate: true,
      showingNoteDetails: false,
      showingNoteEdit: false,
      deletingNote: false
    });
  };

  showNoteDetails = id => {
    const noteToView = this.state.notes.find(note => note._id === id);
    this.setState({
      noteDetails: { ...noteToView },
      showingNotesList: false,
      showingNoteCreate: false,
      showingNoteDetails: true,
      showingNoteEdit: false,
      deletingNote: false
    });
  };

  showNoteEditForm = () => {
    this.setState({
      showingNotesList: false,
      showingNoteCreate: false,
      showingNoteDetails: false,
      showingNoteEdit: true,
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
      note.createdBy = this.state.userId;
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
      <AppStyled className="App">
        <Sidebar
          authenticated={this.state.authenticated}
          logoutUser={this.logoutUser}
          showLogin={this.showLogin}
          showSignup={this.showSignup}
          showNoteCreateForm={this.showNoteCreateForm}
          showNotesList={this.showNotesList}
          showingLogin={this.state.showingLogin}
          showingSignup={this.state.showingSignup}
        />

        <div className="Content">
          {!this.state.authenticated && this.state.showingLogin && (
            <Login loginUser={this.loginUser} />
          )}

          {!this.state.authenticated && this.state.showingSignup && (
            <Signup loginUser={this.loginUser} />
          )}

          {this.state.authenticated && this.state.showingNotesList && (
            <NotesList
              notes={this.state.notes}
              showNoteDetails={this.showNoteDetails}
            />
          )}

          {this.state.authenticated && this.state.showingNoteCreate && (
            <NoteCreate
              getNextId={this.getNextId}
              saveNewNote={this.saveNewNote}
            />
          )}

          {this.state.authenticated && this.state.showingNoteDetails && (
            <NoteDetails
              showDeleteModal={this.showDeleteModal}
              noteDetails={this.state.noteDetails}
              showNoteEditForm={this.showNoteEditForm}
              style={{ padding: "0" }}
            />
          )}

          {this.state.authenticated && this.state.showingNoteEdit && (
            <NoteEdit
              noteDetails={this.state.noteDetails}
              updateNote={this.updateNote}
              showNoteEditForm={this.showNoteEditForm}
              showNoteDetails={this.showNoteDetails}
            />
          )}
        </div>

        {this.state.authenticated && this.state.deletingNote && (
          <DeleteModal
            closeDeleteModal={this.closeDeleteModal}
            deleteNote={this.deleteNote}
          />
        )}
      </AppStyled>
    );
  }
} // App Component ends here

export default App;