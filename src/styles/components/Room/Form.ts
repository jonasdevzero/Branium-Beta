import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  height: 6rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 0 1.5rem;

  background-color: #121212;

  svg {
    color: #ddd;
    cursor: pointer;
    font-size: 2.5rem;
  }
`;

export const Inner = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  height: 4rem;

  outline: none;
  border: none;
  border-radius: 0;

  font-size: 1.6rem;
  color: #fff;
  background-color: #202020;
  margin: 0 1rem;
  padding: 0 5rem 0 1.5rem;
  border-radius: 10rem;
`;

export const MediaInput = styled.input`
  display: none;
`;

export const Submit = styled.button`
  width: 4rem;
  height: 4rem;

  outline: none;
  border: none;
  border-radius: 0;

  cursor: pointer;
  background-color: transparent;

  position: absolute;
  top: 57%;
  right: 2rem;
  transform: translateY(-50%);

  & > div {
    div {
      position: absolute;
    }
  }
  img {
    position: unset !important;
    width: 3.5rem !important;
    height: 3.5rem !important;
  }
`;

export const Icon = styled.button`
  display: flex;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  position: relative;

  background-color: transparent;
  border: none;
  outline: none;

  & + & {
    margin-left: 1.5rem;
  }
`;

export const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 6rem;
  left: 1rem;
`;

export const UploadOptions = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 6rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const UploadOption = styled.label`
  background-color: #000;

  padding: 1.8rem;
  margin-top: 1rem !important;
  border-radius: 100%;
  cursor: pointer;
  transition: opacity 0.2s ease;

  :hover {
    opacity: 0.7;
  }
`;

export const PreviewMediasContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;

  img {
    width: 20rem;
    height: 20rem;
  }
  video {
    width: 50rem;
  }
`;

export const PreviewMediasContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80%;
  width: 100%;
  min-height: 90vh;
`;

export const PreviewMediasInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.8;
  position: relative;
  width: 100%;

  button {
    background-color: transparent;
    border: none;
    outline: none;
    z-index: 1;
    cursor: pointer;

    svg:hover {
      opacity: .7;
    }
  }
  button.remove__media {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;

    svg:hover {
      opacity: 1;
      color: red;
    }
  }
  button.previous {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 5rem;
  }
  button.next {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 5rem;
  }

  svg {
    font-size: 3.5rem;
    transition: opacity .2s ease, color .2s ease-in-out;
  }
`;

export const PreviewMediasForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.2;
  width: 80%;

  div.input__wrapper {
    display: flex;
    width: 100%;
    position: relative;
    height: fit-content;
  }

  button.cancel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;

    background-color: #dc3545;
    border-radius: 50%;
    border: 0;
    outline: 0;
    cursor: pointer;
  }
`;

export const AudioWrapper = styled.div`
  background-color: #222;
  padding: 0.3rem;
  border-radius: 0.5rem;

  svg {
    font-size: 1.8rem;
  }
`;

export const FilesContainer = styled.div`
  display: flex;

  h3 {
    font-size: 2rem;
    align-self: center;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.5rem;
  }
`;

export const FileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 10rem;
  height: 12rem;
  margin: 0.5rem;
  border-radius: 0.5rem;

  background-color: #222;  

  span {
    border-radius: 0.5rem;
    padding: 0.7rem;
    font-size: 1.2rem;
    overflow-wrap: break-word;
  }

  span.name {
    cursor: pointer;
  }

  span.extension {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
    background-color: red;

    span {
      padding: 0;
      z-index: 2;

      svg {
        font-size: 1.8rem;
      }
    }
  }
`;

export const ImageContainer = styled.div`
  img {
    object-fit: contain;
  }
`;
