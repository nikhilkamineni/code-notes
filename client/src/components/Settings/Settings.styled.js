import styled from "styled-components";

const SettingsStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  h1 {
    padding-left: 30px 10px;
  }

  input {
    margin: 10px 10px 10px 0;
    padding: 10px;
    max-width: 200px;
  }

  .Settings__ChangePasswordForm {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    margin-top: 30px;

    .ChangePasswordForm__Label {
      margin-bottom: 15px;
    }
    .ChangePasswordForm__Submit {
      width: 100px;
      margin-top: 20px;
      height: 50px;
      background-color: rgb(94, 190, 195);
      color: #ffffff;
      outline: none;
      font-size: 0.9rem;
      font-weight: bold;
      border: none;
      cursor: pointer;

      &:hover {
        border: 2px solid white;
      }
    }
  }
`;

export default SettingsStyled;
