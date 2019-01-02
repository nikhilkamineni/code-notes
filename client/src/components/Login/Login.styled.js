import styled from "styled-components";

const LoginStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;

  #LoginForm {
    display: flex;
    flex-direction: column;
    padding: 20px;
    align-items: center;
  }

  h2 {
    padding: 20px;
  }

  button {
    width: 100px;
    margin-top: 20px;
    height: 50px;
    background-color: #5ebec3;
    color: #ffffff;
    outline: none;
    font-size: 0.9rem;
    font-weight: bold;
    border: none;

    &:hover {
      border: 2px solid white;
    }
  }

  input {
    outline: 1px solid rgba(0 0 0 0);
    border-style: solid;
    border: 1px solid #808080;
    padding: 15px;
    margin: 10px;
    width: 20%;
    min-width: 150px;
    max-width: 300px;
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

export default LoginStyled;
