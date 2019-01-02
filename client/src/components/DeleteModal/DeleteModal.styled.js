import styled from "styled-components";

const DeleteModalStyled = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
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
    background-color: #fff;
    padding: 40px 80px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #979797;
  }

  .DeleteModalButtons {
    margin: 20px 0;

    button {
      margin: 0 20px;
      height: 50px;
      width: 150px;
      color: #ffffff;
      font-size: 0.8rem;
      font-weight: bold;
      outline: none;
      border: none;
      cursor: pointer;

      &:hover {
        border: 2px solid #979797;
      }
    }

    .DeleteButton {
      background-color: #bf2828;
    }

    .NoButton {
      background-color: #5ebec3;
    }
  }
`;

export default DeleteModalStyled;
