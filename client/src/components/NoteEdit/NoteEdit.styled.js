import styled from "styled-components";

import colors from "../../colors";

const NoteEditStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  input {
    outline: 1px solid rgba(0 0 0 0);
    border: 1px solid ${props => colors.border1[props.theme]};
    background-color: ${props => colors.background1[props.theme]};
    color: ${props => colors.font1[props.theme]};

    &:hover {
      outline: 1px solid rgba(0 0 0 0);
      border: 1px solid ${props => colors.border3[props.theme]};
    }

    &:focus {
      outline: 1px solid ${props => colors.highlight1[props.theme]};
      border: 1px solid ${props => colors.highlight1[props.theme]};
    }
  }

  button {
    width: 100px;
    margin-top: 20px;
    height: 50px;
    background-color: ${props => colors.highlight1[props.theme]};
    color: ${props => colors.font2[props.theme]};
    outline: none;
    font-size: 0.9rem;
    font-weight: bold;
    border: none;

    &:hover {
      border: 2px solid ${props => colors.font2[props.theme]};
    }
  }

  .NoteEdit__TitleInput {
    width: 50%;
    margin-top: 20px;
    font-size: 1rem;
    padding: 10px;
  }

  .NoteEdit__DescriptionInput {
    width: 80%;
    margin-top: 20px;
    font-size: 1rem;
    padding: 10px;
  }

  .NoteEdit__Options {
    .Options__LanguageDropDown {
      width: 120px;
      padding: 5px;
      margin-top: 30px;
      display: inline;
    }

    .Options__LineNumbers {
      padding: 5px;
      margin-left: 30px;
      display: inline;
    }
  }
`;

export default NoteEditStyled;
