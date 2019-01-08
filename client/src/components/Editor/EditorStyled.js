import styled from "styled-components";

import colors from "../../colors";

const EditorStyled = styled.div`
  .Editor__Options {
    width: 400px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${props => colors.border1[props.theme]};
    background-color: ${props => colors.background1[props.theme]};
    color: ${props => colors.font1[props.theme]};
    margin-top: 5px;

    .Options__Language {
      width: 120px;
      padding: 5px;
      display: flex;
      margin-left: 20px;
      margin-right: 20px;
    }

    .Options__LineNumbers {
      padding: 5px;
      margin-left: 30px;
      display: inline;
    }
  }

  .CodeMirror {
    padding: 5px;
    width: auto;
    margin-top: 5px;
    border: 1px solid ${props => colors.border2[props.theme]};
    background: ${props => colors.background4[props.theme]};
  }

  .CodeMirror-scroll,
  .CodeMirror-gutters,
  .CodeMirror-gutter {
    background: ${props => colors.background4[props.theme]};
  }
`;

export default EditorStyled;
