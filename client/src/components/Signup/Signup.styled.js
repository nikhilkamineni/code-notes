import styled from "styled-components";
import colors from "../../colors";

const defaultTheme = "dark";

const SignupStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  background-color: ${colors.background2[defaultTheme]};
  min-height: 100vh;
  width: 100%;

  #Signup__SignupForm {
    width: 280px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-top: 30px;
    margin-top: 40px;
    align-items: center;
    border: 1px solid ${colors.border1[defaultTheme]};
    background-color: ${colors.background4[defaultTheme]};

    #SignupForm__Logo {
      margin-bottom: 15px;
      color: ${colors.font1[defaultTheme]};

      #Logo__TopLine {
        margin-bottom: 0px;
      }

      #Logo__BottomLine {
        margin-top: 0px;
        padding-top: 0px;
        padding-left: 40px;
      }
    }

    input {
      background-color: ${colors.background2[defaultTheme]};
    }

    .SignupForm__SubmitButton {
      margin: 10px 0 20px;
    }

    .SignupForm__Error {
      height: 15px;
      color: ${colors.highlight2[defaultTheme]};
    }
  }

  #Signup__LoginContainer {
    display: inline;
    width: 280px;
    padding: 20px;
    border: 1px solid ${colors.border1[defaultTheme]};
    background-color: ${colors.background4[defaultTheme]};
    color: ${colors.font1[defaultTheme]};
    text-align: center;
    margin-top: 20px;

    #LoginContainer__LoginLink {
      cursor: pointer;
      color: ${colors.highlight1[defaultTheme]};
      width: auto;
      padding: 0 0 0 5px;
      margin: 0;
      background: none;
      border: none
      font: inherit;

      &:hover {
        color: ${colors.highlight2[defaultTheme]};
        border: none;
      }
    }
  }

  button {
    width: 80px;
    height: 40px;
    background-color: ${colors.highlight1[defaultTheme]};
    color: ${colors.font2[defaultTheme]};
    font-size: 0.9rem;
    font-weight: bold;

    &:hover {
      border: 1px solid ${colors.border2[defaultTheme]};
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

export default SignupStyled;
