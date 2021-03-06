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
      border: 1px solid ${props => colors.border3[props.theme]};
    }
  }

  input {
    outline: 1px solid rgba(0 0 0 0);
    border: 1px solid ${props => colors.border1[props.theme]};
    background: ${props => colors.background1[props.theme]};
    color: ${props => colors.font1[props.theme]};
    padding: 15px;
    margin-bottom: 5px;
    transition: border 0.2s;

    &:hover {
      outline: 1px solid rgba(0 0 0 0);
      border: 1px solid ${props => colors.border3[props.theme]};
    }

    &:focus {
      outline: 1px solid ${props => colors.highlight1[props.theme]};
      border: 1px solid ${props => colors.highlight1[props.theme]};
    }
  }

  .CreateNote__TitleLabel {
    margin 20px 0 5px 0;
  }

  .CreateNote__DescriptionLabel {
    margin 15px 0 5px 0;
  }

  .CreateNote__TitleInput {
    padding: 5px;
    width: 40%;
    // margin-top: 20px;
    font-size: 1rem;
  }

  .CreateNote__DescriptionInput {
    padding: 5px;
    width: 80%;
    margin-bottom: 20px;
    font-size: 1rem;
  }

  .CodeMirror {
    &:hover {
      border: 1.5px solid ${props => colors.border3[props.theme]};
    }
  }

  .CodeMirror-focused {
    border: 1.5px solid ${props => colors.highlight1[props.theme]};

    &:hover {
      border: 1.5px solid ${props => colors.highlight1[props.theme]};
    }
  }
`;

export default NoteCreateStyled;
