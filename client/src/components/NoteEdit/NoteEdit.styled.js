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

  .NoteEdit__TitleLabel {
    margin 20px 0 5px 0;
  }

  .NoteEdit__DescriptionLabel {
    margin 20px 0 5px 0;
  }

  .NoteEdit__TitleInput {
    padding: 5px;
    width: 40%;
    font-size: 1rem;
  }

  .NoteEdit__DescriptionInput {
    padding: 5px;
    width: 80%;
    margin-bottom: 20px;
    font-size: 1rem;
  }
`;

export default NoteEditStyled;
