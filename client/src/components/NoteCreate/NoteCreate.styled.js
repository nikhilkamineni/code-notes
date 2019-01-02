import styled from "styled-components";

const NoteCreateStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  button {
    width: 100px;
    margin-top: 20px;
    height: 50px;
    background-color: #5ebec3;
    color: #fff;
    outline: none;
    font-size: 0.9rem;
    font-weight: bold;
    border: none;
    cursor: pointer;

    &:hover {
      border: 2px solid #fff;
    }
  }

  .CreateNote__TitleInput {
    padding: 5px;
    width: 50%;
    margin-top: 20px;
    font-size: 1rem;
  }

  .CreateNote__DescriptionInput {
    padding: 5px;
    width: 80%;
    margin-top: 20px;
    font-size: 1rem;
  }

  .CreateNote__ContentInput {
    padding: 5px;
    width: 80%;
    height: 300px;
    margin-top: 20px;
    font-size: 1rem;
    resize: none;
  }

  input,
  textarea {
    outline: 1px solid rgba(0 0 0 0);
    border-style: solid;
    border: 1px solid #808080;

    &:hover {
      border-style: solid;
      outline: 1px solid rgba(0 0 0 0);
      border: 1px solid #000;
    }

    &:focus {
      outline: 1px solid #5ebec3;
      border: 1px solid #5ebec3;
      border-style: solid;
    }
  }
`;

export default NoteCreateStyled;
