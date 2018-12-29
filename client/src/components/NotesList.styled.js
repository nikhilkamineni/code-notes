import styled from "styled-components";

// STYLES
const NotesListStyled = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color: rgb(243, 243, 243);
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgb(151, 151, 151);
  border-right: 1px solid rgb(151, 151, 151);

  header {
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 10px;

    .searchContainer {
      margin-top: 20px;

      input {
        border-style: solid;
        border: 1px solid grey;
        height: 30px;
        padding: 5px;
        font-size: 1rem;
        width: 172px;

        &:hover {
          border-style: solid;
          border: 1px solid black;
        }

        &:focus {
          outline: 1px solid rgb(94, 190, 195);
          border: 1px solid rgb(94, 190, 195);
          border-style: solid;
        }
      }
    }
  }
`;

export default NotesListStyled
