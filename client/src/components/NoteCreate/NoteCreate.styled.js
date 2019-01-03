import styled from "styled-components";

import colors from "../../colors";

const NoteCreateStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  margin-top: 10px;

  button {
    height: 50px;
    width: 100px;
    margin-top: 20px;
    background-color: ${props => colors.highlight1[props.theme]};
    color: ${props => colors.font2[props.theme]};
    outline: none;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      border: 2px solid ${props => colors.font2[props.theme]};
    }
  }

  .CreateNote__TitleInput {
    padding: 5px;
    width: 50%;
    margin-top: 20px;
    font-size: 1rem;
  }

  .CreateNote__DescriptionInput {
    padding: 5px;
    width: 80%;
    margin-top: 20px;
    font-size: 1rem;
  }

  .CreateNote__ContentInput {
    padding: 5px;
    width: 80%;
    height: 300px;
    margin-top: 20px;
    font-size: 1rem;
    resize: none;
  }

  input,
  textarea {
    outline: 1px solid rgba(0 0 0 0);
    border: 1px solid ${props => colors.border2[props.theme]};

    &:hover {
      outline: 1px solid rgba(0 0 0 0);
      border: 1px solid ${props => colors.border3[props.theme]};
    }

    &:focus {
      outline: 1px solid ${props => colors.highlight1[props.theme]};
      border: 1px solid ${props => colors.highlight1[props.theme]};
    }
  }
`;

export default NoteCreateStyled;
