import styled from "styled-components";

import colors from "../../colors";

const EditorStyled = styled.div`
  .Editor__Options {
    width: 380px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid ${props => colors.border1[props.theme]};
    background-color: ${props => colors.background1[props.theme]};
    color: ${props => colors.font1[props.theme]};
    margin-top: 5px;
    font-size: 10px;

    .Options__Language {
      width: 200px;
      padding-left: 15px;
      padding-right: 15px;
      display: flex;

      .Language__label {
        padding-right: 5px;
      }

      .Language__current {
        font-weight: bold;
      }
    }

    .Options__LineNumbers {
      padding-left: 15px;
      padding-right: 15px;
      display: inline;
    }
  }

  .CodeMirror {
    padding: 5px;
    width: auto;
    height: auto;
    min-height: 300px;
    margin-top: 5px;
    border: 1px solid ${props => colors.border2[props.theme]};
    background: ${props => colors.background1[props.theme]};
  }

  .CodeMirror-scroll,
  .CodeMirror-gutters,
  .CodeMirror-gutter {
    background: ${props => colors.background1[props.theme]};
  }

  .CodeMirror-gutter {
    border-right: 1px solid ${props => colors.border2[props.theme]};
  }
`;

export default EditorStyled;
