import styled from "styled-components";

import colors from "../../colors";

const EditorStyled = styled.div`
  .Editor__Options {
    width: 360px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: ${props => colors.font1[props.theme]};
    margin-top: 5px;
    font-size: 11px;

    .Options__Language {
      width: 180px;
      padding-left: 10px;
      padding-right: 5px;
      display: flex;

      .Language__label {
        padding-right: 5px;
      }

      .Language__current {
        font-weight: bold;
      }

      .Language__select {
        border: 1px solid ${props => colors.border1[props.theme]};
        background-color: ${props => colors.background1[props.theme]};
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
        color: inherit;
        font-size: inherit;
        margin: 0;
        overflow: hidden;
        padding-top: 2px;
        padding-bottom: 2px;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: border 0.2s;

        &:hover {
          border: 1px solid ${props => colors.border3[props.theme]};
          cursor: pointer;
        }

        &:focus {
          outline: 1px solid ${props => colors.highlight1[props.theme]};
          border: 1px solid ${props => colors.highlight1[props.theme]};
        }
      }
    }

    .Options__LineNumbers {
      padding-left: 10px;
      display: inline;
    }
  }

  .CodeMirror {
    padding: 5px;
    width: auto;
    height: auto;
    max-height: 100%;
    // min-height: 100px;
    margin-top: 5px;
    border: 1.5px solid ${props => colors.border1[props.theme]};
    background: ${props => colors.background1[props.theme]};
    font-size: 14px;
    transition: border 0.2s;
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
