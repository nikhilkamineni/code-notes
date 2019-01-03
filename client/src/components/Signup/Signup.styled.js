import styled from "styled-components";
import colors from "../../colors";

const SignupStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  height: 100vh;
  align-items: center;

  h2 {
    padding: 20px;
  }

  h3 {
    margin: 10px;
    color: red;
  }

  button {
    width: 100px;
    margin-top: 20px;
    height: 50px;
    background-color: ${colors.highlight1.light};
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: bold;

    &:hover {
      border: 2px solid white;
    }
  }

  input {
    outline: 1px solid rgba(0 0 0 0);
    border-style: solid;
    border: 1px solid grey;
    padding: 15px;
    margin: 10px;
    width: 30%;
    min-width: 200px;
    font-size: 16px;

    &:hover {
      border-style: solid;
      outline: 1px solid rgba(0 0 0 0);
      border: 1px solid black;
    }

    &:focus {
      outline: 1px solid rgb(94, 190, 195);
      border: 1px solid rgb(94, 190, 195);
      border-style: solid;
    }
  }
`;

export default SignupStyled;
