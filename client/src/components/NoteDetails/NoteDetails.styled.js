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
`;

export default NoteDetailsStyled;
