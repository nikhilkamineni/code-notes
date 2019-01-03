import styled from "styled-components";

import colors from "../../colors";

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
    border: 1px solid ${props => colors.border1[props.theme]};
    background-color: ${props => colors.background4[props.theme]};

    .ChangePasswordForm__Label {
      margin-bottom: 15px;
    }

    .ChangePasswordForm__Input {
      background-color: ${props => colors.background6[props.theme]};
      outline: 1px solid rgba(0 0 0 0);
      border: 1px solid ${props => colors.border1[props.theme]};
      padding: 15px;
      margin: 10px 0;
      min-width: 150px;
      font-size: 13px;

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
      color: ${props => colors.font2[props.theme]};
      font-weight: bold;
      font-size: 13px;
      cursor: pointer;
      border: 2px solid rgba(0 0 0 0);
      outline: 2px solid rgba(0 0 0 0);

      &:hover {
        outline: 2px solid rgba(0 0 0 0);
        border: 2px solid ${props => colors.background4[props.theme]};
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
    border: 1px solid ${props => colors.border1[props.theme]};
    background-color: ${props => colors.background4[props.theme]};

    h3 {
      margin-bottom: 30px;
    }

    .Theme__option {
      padding: 10px;
    }
  }
`;

export default SettingsStyled;
