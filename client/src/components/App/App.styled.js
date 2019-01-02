import styled from "styled-components";

const AppStyled = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: rgb(216, 216, 216);
  font-family: Raleway;
  display: flex;
  flex-flow: row no-wrap;
  color: #444;

  .Content {
    background-color: rgb(243, 243, 243);
    height: 100%;
    min-height: 100vh;
    width: 100%;
    border-left: 1px solid rgb(151, 151, 151);
    border-right: 1px solid rgb(151, 151, 151);
  }
`;

export default AppStyled;
