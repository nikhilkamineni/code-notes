import styled from "styled-components";

const NoteEditStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  height: 100vh;

  button {
    width: 100px;
    margin-top: 20px;
    height: 50px;
    background-color: rgb(94, 190, 195);
    color: #ffffff;
    outline: none;
    font-size: 0.9rem;
    font-weight: bold;
    border: none;

    &:hover {
      border: 2px solid #fff;
    }
  }

  .NoteEdit__TitleInput {
    width: 50%;
    margin-top: 20px;
    font-size: 1rem;
    padding: 10px;
  }

  .NoteEdit__DescriptionInput {
    width: 80%;
    margin-top: 20px;
    font-size: 1rem;
    padding: 10px;
  }

  .NoteEdit__ContentInput {
    width: 80%;
    height: 300px;
    margin-top: 20px;
    font-size: 1rem;
    resize: none;
    padding: 10px;
  }

  input,
  textarea {
    outline: 1px solid rgba(0 0 0 0);
    border-style: solid;
    border: 1px solid #808080;

    &:hover {
      border-style: solid;
      outline: 1px solid rgba(0 0 0 0);
      border: 1px solid #fff;
    }

    &:focus {
      outline: 1px solid #5ebec3;
      border: 1px solid #5ebec3;
      border-style: solid;
    }
  }
`;

export default NoteEditStyled;
