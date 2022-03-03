import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  padding: 5rem;

  overflow-y: scroll;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  background-color: #181818;
  border-radius: 0.3rem;
  padding: 2rem;

  .col {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    flex-direction: row;
  }

  h2 {
    align-self: flex-start;
    margin-bottom: 3rem;
    font-size: 1.8rem;
    font-weight: 400;
    color: #ddd;
  }
`;

export const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 20rem;

  border: solid 0.1rem #333;
  border-radius: 50%;
  margin-right: 4rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  :hover {
    opacity: 0.7;
  }

  svg {
    font-size: 4rem;
    color: #555;
  }
`;

export const ImagePreview = styled.div`
  width: 20rem;
  height: 20rem;
  position: relative;

  border: solid 0.1rem #333;
  border-radius: 50%;
  margin-right: 4rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  span.remove {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0.7rem;
    right: 1.2rem;

    width: 3.5rem;
    height: 3.5rem;

    border-radius: 50%;
    background-color: #202020;
    border: solid 0.1rem #303030;
    cursor: pointer;

    svg {
      font-size: 1.8rem;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 1.5rem;
  }
`;

export const Label = styled.label`
  font-size: 1.5rem;
  color: #ddd;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 35rem;
  height: 4.5rem;

  font-size: 1.6rem;
  color: #bbb;
  background-color: #202020;
  padding: 0 0.5rem;
  border: none;
  border-radius: 0.3rem;
  outline: none;
`;

export const Textarea = styled.textarea`
  width: 35rem;
  min-height: 7rem;
  max-height: 10rem;

  font-size: 1.6rem;
  color: #bbb;
  background-color: #202020;
  padding: 0.5rem;
  border: none;
  border-radius: 0.3rem;
  outline: none;
  resize: vertical;
`;

export const Submit = styled.button`
  width: 15rem;
  height: 4rem;

  font-size: 1.5rem;
  background-color: #202020;
  color: #fff;
  margin-top: 2rem;
  border: none;
  border-radius: 0.3rem;
  outline: none;
  cursor: pointer;

  transition: opacity 0.2s ease;

  :hover {
    opacity: 0.7;
  }
`;

export const Hr = styled.hr`
  width: 100%;
  margin: 3rem 0;
  border: none;
  border-bottom: solid 0.1rem #333;
`;

export const Members = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  background-color: #181818;
  border-radius: 0.3rem;
  padding: 2rem;
`;

export const MembersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3rem;

  h2 {
    align-self: flex-start;
    font-size: 1.8rem;
    font-weight: 400;
    color: #ddd;
  }

  input {
    flex: 1;
    height: 4rem;

    color: #eee;
    background-color: #222;
    margin: 0 4rem;
    padding: 0 1rem;
    border: none;
    border-radius: .5rem;
    outline: none;
  }

  button {
    height: 3rem;
    padding: 0 1rem;

    color: #ddd;
    background-color: green;
    border: none;
    border-radius: 0.3rem;
    outline: none;
    cursor: pointer;
  }
`;

export const MembersInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Member = styled.div`
  display: flex;
  align-items: center;
  width: 60em;
  position: relative;

  padding: 1rem;
  border-radius: 0.3rem;
  transition: background-color 0.2s ease-in;

  & + & {
    margin-top: 0.5rem;
  }

  &:hover {
    background-color: #202020;
  }

  h3 {
    margin-left: 1rem;
    font-size: 1.7rem;
    font-weight: 400;
  }
  span.role {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    right: 5rem;
    transform: translateY(-50%);
    height: 2.7rem;

    font-size: 1.2rem;
    background-color: #111;
    padding: 0 0.5rem;
    margin-left: 1rem;
    border-radius: 0.3rem;

    &.adm {
      background-color: green;
    }
  }
`;

export const MemberActions = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;

  &.hidden {
    display: none;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    color: #fff;
    background-color: #111;
    border: none;
    border-radius: 0.7rem;
    outline: none;
    cursor: pointer;

    svg {
      font-size: 1.8rem;
    }
  }

  div.actions__inner {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 101%;
    right: 0;
    width: 15rem;

    background-color: #111;
    padding: .7rem 0;
    border-radius: .3rem;

    z-index: 2;

    .action {
      font-size: 1.3rem;
      padding: 1rem;

      cursor: pointer;
      transition: background-color .2s ease-in;
    }
    .action.danger {
      color: red;
    } 
    .action:hover {
      background-color: #202020;
    }
  }
`;
