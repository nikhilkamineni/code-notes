import styled from "styled-components";

import colors from "../../colors";

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  min-width: 200px;
  height: 100%;
  padding: 10px;

  h1 {
    margin-bottom: 31px;
    padding-top: 10px;
    width: 150px;
  }

  .Sidebar__Logo {
    margin-left: 35px;
    color: ${props => colors.font1[props.theme]};
  }

  #Sidebar__Menu {
    // position: fixed;
    display: flex;
    // top: 100px;
    // left: 33px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #Sidebar__Logout {
      margin-top: 40px;
    }
  }

  .Sidebar__Link {
    margin-bottom: 20px;
    font-family: Roboto;
    padding: 20px 0;
    width: 140px;
    background-color: ${props => colors.highlight1[props.theme]};
    color: ${props => colors.font2[props.theme]};
    outline: none;
    font-size: 0.9rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    border: 1px solid ${props => colors.background1[props.theme]};
    text-align: center;
    text-decoration: none;

    &:hover {
      border: 1px solid ${props => colors.border4[props.theme]};
    }
  }
`;

export default SidebarStyled;
