import styled from "styled-components";

import colors from "../../colors";

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
    border: 1px dashed ${props => colors.border1[props.theme]};
    background-color: ${props => colors.background5[props.theme]};
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
    border: 1px dashed ${props => colors.border1[props.theme]};
    padding: 10px;
  }

  th,
  table {
    border: 1px solid ${props => colors.border1[props.theme]};
    padding: 10px;
    background-color: ${props => colors.background2[props.theme]};
  }

  code {
    color: ${props => colors.font3[props.theme]};
    border-radius: 2px;
    padding: 3px;
    font-family: monospace;
    background-color: ${props => colors.background3[props.theme]};
    line-height: 15px;
  }

  pre {
    background-color: ${props => colors.background3[props.theme]};
    margin: 10px 25px 10px 10px;
    padding: 5px;

    code {
      border: none;
      border-radius: 4px;
    }
  }
`;

export default NoteDetailsStyled;
