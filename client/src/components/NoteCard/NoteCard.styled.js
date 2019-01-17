import styled from "styled-components";

import colors from "../../colors";

const NoteCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 200px;
  border: 1px solid ${props => colors.border1[props.theme]};
  padding: 10px;
  margin: 10px;
  background-color: ${props => colors.background1[props.theme]};
  transition: border 0.3s;

  &:hover {
    border: 1px solid ${props => colors.border3[props.theme]};
    cursor: pointer;
  }

  h4 {
    margin: 3px 3px 0 3px;
  }

  p {
    font-size: 0.8rem;
    line-height: 25px;
    margin: 0 3px;
    white-space: pre-line;
  }

  hr {
    border-color: ${props => colors.border1[props.theme]};
  }
`;

export default NoteCardStyled;
