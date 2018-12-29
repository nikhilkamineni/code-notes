import styled from "styled-components";

// Styles
const NoteDetailsStyled = styled.div`
  padding: 20px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: rgb(243, 243, 243);
  border-left: 1px solid rgb(151, 151, 151);
  border-right: 1px solid rgb(151, 151, 151);

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 10px 30px 20px 20px;
    width: 90%;

    .Header__Actions {
      padding-right: 40px;
    }
  }

  .NoteDetails__Description {
    margin-left: 20px;
  }

  .NoteDetails__Content {
    width: 90%;
    border: 1px dashed rgb(151, 151, 151);
    background-color: rgb(240, 240, 240);
    padding: 15px 0 15px 15px;
    min-height: 50%;
  }

  footer {
    width: 90%;

    .Date {
      margin: 10px 0;
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
    width: 90%;
    white-space: pre-line;
    padding-bottom: 15px;
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
