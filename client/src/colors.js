const colors = {
  light: {
    App: {
      "background-color": "rgb(243, 243, 243)"
    },

    DeleteModal: {
      "background-color": "rgba(0, 0, 0, 0.3)",
      DeleteModalDialog: {
        border: "2px solid rgb(151, 151, 151)"
      },
      DeleteModalButtons: {
        button: {
          color: "#ffffff",
          "&:hover": {
            border: "2px solid rgb(151, 151, 151)"
          }
        },
        DeleteButton: {
          "background-color": "rgb(191, 40, 40)"
        },

        NoButton: {
          "background-color": "rgb(94, 190, 195)"
        }
      }
    },

    Login: {
      "border-left": "1px solid rgb(151, 151, 151)",
      "border-right": "1px solid rgb(151, 151, 151)",
      button: {
        "background-color": "rgb(94, 190, 195)",
        color: "#ffffff",
        "&:hover": {
          border: "2px solid white"
        }
      },
      input: {
        outline: "1px solid rgba(0 0 0 0)",
        border: "1px solid grey",
        "&:hover": {
          outline: "1px solid rgba(0 0 0 0)",
          border: "1px solid black"
        },
        "&:focus": {
          outline: "1px solid rgb(94, 190, 195)",
          border: "1px solid rgb(94, 190, 195)"
        }
      }
    },

    NoteCard: {
      border: "1px solid rgb(166, 166, 166)",
      "background-color": "rgb(255, 255, 255)",
      "&:hover": {
        border: "1px solid black"
      },
      h4: {
        color: "#000000"
      }
    },

    NoteCreate: {
      "border-left": "1px solid rgb(151, 151, 151)",
      "border-right": "1px solid rgb(151, 151, 151)",
      button: {
        "background-color": "rgb(94, 190, 195)",
        color: "#ffffff",
        "&:hover": {
          border: "2px solid white"
        }
      },
      "input, textarea": {
        outline: "1px solid rgba(0 0 0 0)",
        border: "1px solid grey",
        "&:hover": {
          outline: "1px solid rgba(0 0 0 0)",
          border: "1px solid black"
        },
        "&:focus": {
          outline: "1px solid rgb(94, 190, 195)",
          border: "1px solid rgb(94, 190, 195)"
        }
      }
    },

    NoteDetails: {
      "border-left": "1px solid rgb(151, 151, 151)",
      "border-right": "1px solid rgb(151, 151, 151)",
      NoteDetails__Content: {
        border: "1px dashed rgb(151, 151, 151)",
        "background-color": "rgb(238, 238, 238)"
      },
      "thead, td": {
        border: "1px dashed rgb(166, 166, 166)",
        padding: "10px"
      },
      "th, table": {
        border: "1px solid rgb(166, 166, 166)",
        "background-color": "rgb(243, 243, 243)"
      },
      code: {
        border: "1px solid rgb(225, 225, 225)",
        color: "rgb(215, 43, 63)",
        "background-color": "rgba(166, 166, 166, 0.2)"
      },
      pre: {
        border: "1px solid rgb(225, 225, 225)",
        "background-color": "rgba(166, 166, 166, 0.1)",

        code: {
          "background-color": "rgba(166, 166, 166, 0)"
        }
      }
    },

    NoteEdit: {
      "border-left": "1px solid rgb(151, 151, 151)",
      "border-right": "1px solid rgb(151, 151, 151)",
      button: {
        "background-color": "rgb(94, 190, 195)",
        color: "#ffffff",
        "&:hover": {
          border: "2px solid white"
        }
      },
      "input, textarea": {
        outline: "1px solid rgba(0 0 0 0)",
        border: "1px solid grey",
        "&:hover": {
          outline: "1px solid rgba(0 0 0 0)",
          border: "1px solid black"
        },
        "&:focus": {
          outline: "1px solid rgb(94, 190, 195)",
          border: "1px solid rgb(94, 190, 195)"
        }
      }
    },

    NotesList: {
      header: {
        searchContainer: {
          input: {
            border: "1px solid grey",
            "&:hover": {
              border: "1px solid black"
            },
            "&:focus": {
              outline: "1px solid rgb(94, 190, 195)",
              border: "1px solid rgb(94, 190, 195)"
            }
          }
        }
      }
    },

    Settings: {
      Settings__ChangePasswordForm: {
        ChangePasswordForm__Submit: {
          "background-color": "rgb(94, 190, 195)",
          color: "#ffffff",
          "&:hover": {
            border: "2px solid white"
          }
        }
      }
    },

    Sidebar: {
      "background-color": "rgb(216, 216, 216)",
      button: {
        "background-color": "rgb(94, 190, 195)",
        color: "#ffffff",
        "&:hover": {
          border: "2px solid rgb(243, 243, 243)"
        }
      }
    }
  }
};

export default colors;
