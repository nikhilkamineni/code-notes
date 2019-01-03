import styled from "styled-components";
import colors from "../../colors";

const AppStyled = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${props => colors.background1[props.theme]};
  font-family: Raleway;
  display: flex;
  flex-flow: row no-wrap;
  color: ${props => colors.font1[props.theme]};

  .Content {
    background-color: ${props => colors.background2[props.theme]};
    height: 100%;
    min-height: 100vh;
    width: 100%;
    border-left: 1px solid ${props => colors.border1[props.theme]};
  }

  button {
    outline: none;
    border: none;
    cursor: pointer;
  }
`;

export default AppStyled;
