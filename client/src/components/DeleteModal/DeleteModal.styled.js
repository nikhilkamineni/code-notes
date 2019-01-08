import styled from "styled-components";

import colors from "../../colors";

const DeleteModalStyled = styled.div`
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => colors.background7[props.theme]};
  left: auto;
  right: auto;
  top: auto;
  bottom: auto;
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;

  .DeleteModalDialog {
    margin: auto;
    background-color: ${props => colors.background1[props.theme]};
    padding: 30px 60px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${props => colors.border1[props.theme]};
  }

  .DeleteModalButtons {
    margin: 20px 0;

    button {
      margin: 0 20px;
      height: 40px;
      width: 120px;
      color: ${props => colors.font2[props.theme]};
      font-size: 0.8rem;
      font-weight: bold;
      outline: none;
      border: none;
      cursor: pointer;

      &:hover {
        border: 1px solid ${props => colors.border1[props.theme]};
      }
    }

    .DeleteButton {
      background-color: ${props => colors.highlight2[props.theme]};
    }

    .NoButton {
      background-color: ${props => colors.highlight1[props.theme]};
    }
  }
`;

export default DeleteModalStyled;
