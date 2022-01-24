import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: scroll;

  div.row {
    display: flex;
    flex-direction: row;
  }
  div.col {
    display: flex;
    flex-direction: column;
  }
`;

export const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12rem;
  height: 12rem;

  border: solid 0.1rem #333;
  border-radius: 50%;
  margin-right: 2rem;
  cursor: pointer;

  svg {
    font-size: 3rem;
    color: #555;
  }
`;

export const ImagePreview = styled.div`
  width: 12rem;
  height: 12rem;
  position: relative;

  border: solid 0.1rem #333;
  border-radius: 50%;
  margin-right: 2rem;

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
    bottom: 0.2rem;
    right: 0.7rem;

    width: 2.5rem;
    height: 2.5rem;

    border-radius: 50%;
    background-color: #202020;
    border: solid 0.1rem #303030;
    cursor: pointer;

    svg {
      font-size: 1.5rem;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 1rem;
  }
`;

export const Label = styled.label`
  font-size: 1.3rem;
  margin-bottom: 0.2rem;
`;

export const Input = styled.input`
  width: 20rem;
  height: 3.5rem;

  color: #fff;
  background-color: #202020;
  padding: 0 0.5rem;
  border: solid 0.1rem #252525;
  outline: none;
`;

export const TextArea = styled.textarea`
  min-width: 20rem;
  max-width: 20rem;
  min-height: 5rem;
  max-height: 5rem;
  resize: none;

  color: #fff;
  background-color: #202020;
  padding: 0.5rem;
  border: solid 0.1rem #252525;
  outline: none;
`;

export const Submit = styled.button`
  color: #ffffff;
  background-color: #198754;
  margin: 2rem 0 1rem 0.7rem;
  min-height: 3.5rem;
  width: 7rem;
  border: none;
  border-radius: 0.2rem;
  outline: none;
  cursor: pointer;
`;

export const MembersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  h4 {
    font-size: 1.6rem;
  }
`;

export const Addmember = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;

  background-color: #198754;
  border-radius: 0.5rem;
  cursor: pointer;

  svg {
    font-size: 1.8rem;
  }
`;

export const Members = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.5rem;

  & > * {
    margin: 0.5rem;
  }
`;

export const Member = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h5 {
    font-size: 1.2rem;
  }

  span.remove {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: -0.6rem;
    right: -0.6rem;

    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    background-color: #dc3545;
    cursor: pointer;

    svg {
      font-size: 1.4rem;
    }
  }
`;

export const SelectContacts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  overflow-y: scroll;

  span.finish {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.7rem;
    min-height: 2.7rem;
    background-color: #198754;
    border-radius: 50%;
    cursor: pointer;
    margin: 1rem 1rem 0 0;
    margin-left: auto;

    svg {
      font-size: 1.5rem;
    }
  }
`;

export const Contacts = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 1rem;

  div.contact {
    display: flex;
    align-items: center;
    cursor: pointer;

    h5 {
      font-size: 1.5rem;
      margin-left: 0.5rem;
    }

    input {
      margin-left: 5rem;
    }

    span.radio {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;

      margin-left: 7rem;
      border: solid 0.1rem #777;
      border-radius: 50%;

      span.selected {
        width: .75rem;
        height: .75rem;
        border-radius: 50%;
        background-color: #777;;
      }
    }
  }

  div.contact + div.contact {
    margin-top: 1.5rem;
  }
`;
