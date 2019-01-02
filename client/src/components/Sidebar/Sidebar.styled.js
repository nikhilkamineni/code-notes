import styled from "styled-components";

// Styles
const SidebarStyled = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 100%;
  padding: 20px;

  h1 {
    margin-bottom: 31px;
    padding-top: 10px;
    width: 150px;
  }

  .Sidebar__Logo {
    padding-left: 6px;
    .Logo__TopLine {
      margin-bottom: 0px;
      padding-left: 15px;
    }

    .Logo__BottomLine {
      margin-top: 0px;
      padding-top: 0px;
      padding-left: 38px;
    }
  }

  button {
    margin-bottom: 20px;
    font-family: Roboto;
    height: 50px;
    width: 150px;
    background-color: rgb(94, 190, 195);
    color: #ffffff;
    outline: none;
    font-size: 0.9rem;
    font-weight: bold;
    border: none;
    cursor: pointer;

    &:hover {
      border: 2px solid rgb(243, 243, 243);
    }
  }
`;

export default SidebarStyled;
