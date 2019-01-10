import styled from "styled-components";
import colors from "../../colors";

const defaultTheme = "dark";

const LoginStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  background-color: ${colors.background2[defaultTheme]};
  min-height: 100vh;
  width: 100%;

  #Login__LoginForm {
    width: 280px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-top: 30px;
    margin-top: 40px;
    align-items: center;
    border: 1px solid ${colors.border1[defaultTheme]};
    background-color: ${colors.background4[defaultTheme]};

    #Login__Logo {
      margin-bottom: 15px;
      color: ${colors.font1[defaultTheme]};

      // #Logo__TopLine {
      // }

      // #Logo__BottomLine {
      // }
    }

    #Login__Tagline {
      color: ${colors.font1[defaultTheme]};
      margin-top: 5px;
      margin-bottom: 40px;
      text-align: center;
    }

    input {
      background-color: ${colors.background2[defaultTheme]};
    }

    .SubmitButton {
      margin: 10px 0 20px;
    }

    #loginError {
      color: ${colors.highlight2[defaultTheme]}
      height: 20px;
    }
  }

  button {
    width: 80px;
    height: 40px;
    background-color: ${colors.highlight1[defaultTheme]};
    border: 1px solid ${colors.highlight1[defaultTheme]};
    color: ${colors.font1[defaultTheme]};
    font-size: 0.9rem;
    font-weight: bold;

    &:hover {
      border: 1px solid ${colors.border2[defaultTheme]};
    }
  }

  #Login__SignupContainer {
    display: inline;
    width: 280px;
    padding: 20px;
    border: 1px solid ${colors.border1[defaultTheme]};
    background-color: ${colors.background4[defaultTheme]};
    color: ${colors.font1[defaultTheme]};
    text-align: center;
    margin-top: 20px;

    #SignupContainer__SignupLink {
      cursor: pointer;
      color: ${colors.highlight1[defaultTheme]};
      width: auto;
      padding: 0;
      margin: 0;
      background: none;
      border: none
      font: inherit;
      font-weight: bold;

      &:hover {
        color: ${colors.highlight2[defaultTheme]};
        border: none;
      }
    }
  }

  input {
    outline: 1px solid rgba(0 0 0 0);
    border: 1px solid ${colors.border1[defaultTheme]};
    color: ${colors.font1[defaultTheme]};
    padding: 15px;
    margin: 10px;
    width: 20%;
    min-width: 150px;
    max-width: 300px;
    font-size: 16px;

    &:hover {
      outline: 1px solid rgba(0 0 0 0);
      border: 1px solid ${colors.border2[defaultTheme]};
    }

    &:focus {
      outline: 1px solid ${colors.highlight1[defaultTheme]};
      border: 1px solid ${colors.highlight1[defaultTheme]};
    }
  }
`;

export default LoginStyled;
