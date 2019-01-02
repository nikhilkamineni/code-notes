import styled from "styled-components";

const SettingsStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;

  header {
    padding-left: 30px 10px;
  }

  .Settings__Content {
    display: flex;
    flex-flow: row wrap;
    padding: 20px;
    display: flex;
  }

  .Settings__ChangePasswordForm {
    width: 220px;
    height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 30px 20px;
    margin: 30px;
    border: 1px solid rgb(151, 151, 151);
    background-color: rgb(255, 255, 255);

    .ChangePasswordForm__Label {
      margin-bottom: 15px;
    }

    .ChangePasswordForm__Input {
      background-color: rgb(250, 250, 250);
      outline: 1px solid rgba(0 0 0 0);
      border-style: solid;
      border: 1px solid grey;
      padding: 15px;
      margin: 10px 0;
      min-width: 150px;
      font-size: 13px;

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

    .ChangePasswordForm__Submit {
      margin-top: 10px;
      width: 100px;
      padding: 10px;
      background-color: #5ebec3;
      color: #fff;
      font-weight: bold;
      font-size: 13px;
      cursor: pointer;
      border: 2px solid rgba(0 0 0 0);
      outline: 2px solid rgba(0 0 0 0);

      &:hover {
        outline: 2px solid rgba(0 0 0 0);
        border: 2px solid #fff;
      }
    }
  }

  .Settings__Theme {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: space-evenly;
    width: 220px;
    height: 240px;
    padding: 30px 30px 20px;
    margin: 30px;
    border: 1px solid #979797;
    background-color: #fff;

    h3 {
      margin-bottom: 30px;
    }

    .Theme__option {
      padding: 10px;
    }
  }
`;

export default SettingsStyled;
