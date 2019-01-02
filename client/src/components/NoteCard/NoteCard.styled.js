import styled from "styled-components";

const NoteCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 200px;
  border: 1px solid #979797;
  padding: 10px;
  margin: 10px;
  background-color: #fff;

  &:hover {
    border: 1px solid #000;
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
`;

export default NoteCardStyled;
