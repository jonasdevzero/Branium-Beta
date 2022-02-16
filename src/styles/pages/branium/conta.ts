import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;
  padding: 5rem 2rem;

  overflow-y: hidden;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  .col {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    flex-direction: row;
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
  width: 25rem;
  height: 4.5rem;

  font-size: 1.6rem;
  color: #bbb;
  background-color: #202020;
  padding: 0 0.5rem;
  border: solid 0.1rem #252525;
  outline: none;
`;

export const Submit = styled.button`
  width: 10rem;
  height: 4rem;

  font-size: 1.5rem;
  background-color: #202020;
  color: #fff;
  margin-top: 2rem;
  border: solid 0.1rem #252525;
  outline: none;
  cursor: pointer;

  transition: opacity 0.2s ease;

  :hover {
    opacity: 0.7;
  }
`;

export const UpdateEmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 5rem;

  .wrapper {
    display: flex;
  }
`;

export const EmailInput = styled.input`
  width: 100%;
  height: 4.5rem;

  font-size: 1.6rem;
  color: #bbb;
  background-color: #202020;
  padding: 0 1.2rem;
  border: solid 0.1rem #252525;
  outline: none;
`;

export const EditEmail = styled.button`
  background-color: #202020;
  color: #fff;
  margin-left: 1rem;
  padding: 0.2rem 1rem;
  border: solid 0.1rem #252525;
  outline: none;

  cursor: pointer;
  transition: opacity 0.2s ease;

  :hover {
    opacity: 0.7;
  }

  svg {
    font-size: 2rem;
  }
`;

export const UpdateEmailForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);

  width: 32rem;

  background-color: #191818;
  border: solid 0.1rem #222;
  padding: 4rem 0;
  z-index: 2;

  h3 {
    font-size: 3rem;
    margin-bottom: 4rem;
    font-weight: 400;
    color: #ddd;
  }

  button.submit {
    width: 25rem;
    height: 4.5rem;

    font-size: 1.6rem;
    color: #bbb;
    background-color: #202020;

    margin-top: 5rem;
    padding: 0 0.5rem;
    border: solid 0.1rem #252525;
    outline: none;
    cursor: pointer;
  }

  span.close {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;

    svg {
      font-size: 2.3rem;
      cursor: pointer;
    }
  }
`;
