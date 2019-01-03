import styled from "styled-components";
import colors from "../../colors";

const SignupStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  background-color: ${colors.background2.light};
  min-height: 100vh;

  #Signup__SignupForm {
    width: 280px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-top: 30px;
    margin-top: 40px;
    align-items: center;
    border: 1px solid ${colors.border1.light};
    background-color: #fff;

    #SignupForm__Logo {
      margin-bottom: 15px;
      color: #444;

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
      background-color: ${colors.background2.light};
    }

    .SignupForm__SubmitButton {
      margin: 10px 0 20px;
    }

    .SignupForm__Error {
      height: 15px;
      color: ${colors.highlight2.light};
    }
  }

  #Signup__LoginContainer {
    display: inline;
    width: 280px;
    padding: 20px;
    border: 1px solid ${colors.border1.light};
    background-color: ${colors.font2.light};
    text-align: center;
    margin-top: 20px;

    #LoginContainer__LoginLink {
      cursor: pointer;
      color: ${colors.highlight1.light};
      width: auto;
      padding: 0 0 0 5px;
      margin: 0;
      background: none;
      border: none
      font: inherit;

      &:hover {
        color: ${colors.highlight2.light};
        border: none;
      }
    }
  }

  button {
    width: 80px;
    height: 40px;
    background-color: ${colors.highlight1.light};
    color: ${colors.font2.light};
    font-size: 0.9rem;
    font-weight: bold;

    &:hover {
      border: 1px solid ${colors.border2.light};
    }
  }

  input {
    outline: 1px solid rgba(0 0 0 0);
    border-style: solid;
    border: 1px solid ${colors.border2.light};
    padding: 15px;
    margin: 10px;
    width: 20%;
    min-width: 150px;
    max-width: 300px;
    font-size: 16px;

    &:hover {
      border-style: solid;
      outline: 1px solid rgba(0 0 0 0);
      border: 1px solid #000;
    }

    &:focus {
      outline: 1px solid ${colors.highlight1.light};
      border: 1px solid ${colors.highlight1.light};
      border-style: solid;
    }
  }
`;

export default SignupStyled;
