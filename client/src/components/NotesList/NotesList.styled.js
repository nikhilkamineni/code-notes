import styled from "styled-components";

import colors from "../../colors";

const NotesListStyled = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;

  .NotesList__body {
    width: 100%;
  }

  header {
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 10px;

    .searchContainer {
      margin-top: 20px;

      input {
        background-color: ${props => colors.background4[props.theme]};
        border: 1px solid ${props => colors.border1[props.theme]};
        height: 30px;
        padding: 5px 10px;
        font-size: 1rem;
        width: 160px;

        &:hover {
          border: 1px solid ${props => colors.border3[props.theme]};
        }

        &:focus {
          outline: 1px solid ${props => colors.highlight1[props.theme]};
          border: 1px solid ${props => colors.highlight1[props.theme]};
        }
      }
    }
  }
`;

export default NotesListStyled;
