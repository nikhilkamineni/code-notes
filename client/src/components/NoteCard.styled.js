import styled from "styled-components";

const NoteCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 200px;
  border: 1px solid rgb(166, 166, 166);
  padding: 10px;
  margin: 10px;
  background-color: rgb(255, 255, 255);

  &:hover {
    border: 1px solid black;
    cursor: pointer;
  }

  h4 {
    margin: 3px 3px 0 3px;
    color: #000000;
  }

  p {
    font-size: 0.8rem;
    line-height: 25px;
    margin: 0 3px;
    white-space: pre-line;
  }
`;

export default NoteCardStyled;
