import styled from "styled-components";

const NoteDetailsStyled = styled.div`
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;
  }

  .NoteDetails__Actions {
    padding-right: 5px;
    padding-bottom: 10px;
    display: flex;
    justify-content: flex-end;
    button {
      border: none;
      background: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
      outline: inherit;

      &:hover {
        font-weight: bolder;
        text-decoration: underline;
      }
    }
  }

  .NoteDetails__Description {
    margin-bottom: 20px;
  }

  .NoteDetails__Content {
    border: 1px dashed rgb(151, 151, 151);
    background-color: rgb(238, 238, 238);
    padding: 15px 0 15px 15px;
    min-height: 300px;
  }

  footer {
    .Date {
      margin: 10px 0;
      padding-right: 10px;
      font-size: 1rem;
      display: flex;
      justify-content: flex-end;
    }
  }

  a {
    padding-left: 10px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    white-space: pre-line;
    margin-right: 15px;
    line-height: 25px;
  }

  ul {
    padding-left: 20px;
    list-style-type: disc;
  }

  ol {
    padding-left: 20px;
    list-style-type: decimal;
  }

  li,
  tbody {
    font-size: 1rem;
    line-height: 25px;
  }

  thead,
  td {
    border: 1px dashed rgb(166, 166, 166);
    padding: 10px;
  }

  th,
  table {
    border: 1px solid rgb(166, 166, 166);
    padding: 10px;
    background-color: rgb(243, 243, 243);
  }

  code {
    border: 1px solid rgb(225, 225, 225);
    color: rgb(215, 43, 63);
    border-radius: 2px;
    padding: 3px;
    font-family: monospace;
    background-color: rgba(166, 166, 166, 0.2);
    line-height: 15px;
  }

  pre {
    border: 1px solid rgb(225, 225, 225);
    background-color: rgba(166, 166, 166, 0.1);
    padding: 5px;
    width: 80%;
    margin: 10px 0;

    code {
      border: none;
      background-color: rgba(166, 166, 166, 0);
      border-radius: 4px;
    }
  }
`;

export default NoteDetailsStyled;
