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

  .NoteDetails__Options {
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

  .CodeMirror {
    background: ${props => colors.background1[props.theme]};
    border: 1px solid ${props => colors.border1[props.theme]};
    height: auto;
    width: auto;
    padding: 5px;
  }

  .CodeMirror-scroll,
  .CodeMirror-lines,
  .CodeMirror-gutters,
  .CodeMirror-gutter {
    background: ${props => colors.background4[props.theme]};
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
`;

export default NoteDetailsStyled;
