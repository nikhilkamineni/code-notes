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
    margin-left: 5px;
  }

  .NoteDetails__Options {
    padding-right: 5px;
    padding-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    margin-top: 5px;

    #edit {
      text-decoration: none;
      color: inherit;

      &:visited {
        color: inherit;
      }

      &:hover {
        font-weight: bolder;
        text-decoration: underline;
      }
    }

    #delete {
      color: ${props => colors.highlight2[props.theme]};
      border: none;
      background: none;
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
    margin-left: 5px;
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
