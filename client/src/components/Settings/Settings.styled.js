import styled from "styled-components";

import colors from "../../colors";

const SettingsStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 30px;
  margin-top: 10px;

  .Settings__Content {
    display: flex;
    flex-flow: row wrap;
    display: flex;
  }

  .Settings__ChangePasswordForm {
    width: 220px;
    height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 20px 20px 20px;
    margin: 30px 0;
    border: 1px solid ${props => colors.border1[props.theme]};
    background-color: ${props => colors.background4[props.theme]};

    .ChangePasswordForm__Label {
      margin-bottom: 15px;
    }

    .ChangePasswordForm__Input {
      background-color: ${props => colors.background2[props.theme]};
      outline: 1px solid rgba(0 0 0 0);
      border: 1px solid ${props => colors.border1[props.theme]};
      padding: 10px;
      margin: 10px 0;
      min-width: 150px;
      font-size: 14px;

      &:hover {
        outline: 1px solid rgba(0 0 0 0);
        border: 1px solid ${props => colors.border3[props.theme]};
      }

      &:focus {
        outline: 1px solid ${props => colors.highlight1[props.theme]};
        border: 1px solid ${props => colors.highlight1[props.theme]};
      }
    }

    .ChangePasswordForm__Submit {
      margin-top: 10px;
      width: 100px;
      padding: 10px;
      background-color: ${props => colors.highlight1[props.theme]};
      border: 1px solid ${props => colors.background4[props.theme]};
      color: ${props => colors.font2[props.theme]};
      font-weight: bold;
      font-size: 13px;
      cursor: pointer;
      outline: 1px solid rgba(0 0 0 0);

      &:hover {
        border: 1px solid ${props => colors.border4[props.theme]};
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
    padding: 30px 20px 20px;
    margin: 30px;
    border: 1px solid ${props => colors.border1[props.theme]};
    background-color: ${props => colors.background4[props.theme]};

    h3 {
      margin-bottom: 30px;
    }

    .Theme__option {
      padding: 10px;
      margin: 20px;
      width: 100px;

      input {
        display: none;
      }

      #currentTheme {
        color: ${props => colors.font2[props.theme]};
        background-color: ${props => colors.highlight1[props.theme]};
      }

      label {
        cursor: pointer;
        font-size: 20px;
        padding: 20px;

        &:hover {
          color: ${props => colors.highlight1[props.theme]};
        }
      }

    }

    #Theme__Content {
      width: 100%;
      height: 100%
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: space-evenly;
      justify-content: center;
      margin-bottom: 30px;
      margin-left: 15px;
    }
  }
`;

export default SettingsStyled;
