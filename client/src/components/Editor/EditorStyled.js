import styled from "styled-components";

import colors from "../../colors";

const EditorStyled = styled.div`
  .Editor__Options {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;

    .Options__Language {
      width: 120px;
      padding: 5px;
      display: inline;
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
    margin-top: 20px;
    border: 1px solid ${props => colors.border2[props.theme]};
    background: ${props => colors.background4[props.theme]};
  }

  // .react-codemirror2 {
  //   border: 1px solid red;
  // }

  .CodeMirror-scroll,
  .CodeMirror-gutters,
  .CodeMirror-gutter {
    background: ${props => colors.background4[props.theme]};
  }
`;

export default EditorStyled;
