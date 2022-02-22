import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 7rem;

  padding: 0 3rem;
  background-color: #121212;

  h2 {
    font-size: 1.8rem;
    font-weight: 500;
    margin-left: 1rem;
  }
`;

export const Room = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-right: 20%;

  cursor: pointer;

  h2 {
    font-size: 1.8rem;
    font-weight: 500;
    margin-left: 1rem;
  }
`;

export const Icon = styled.span`
  position: relative;
  font-size: 2.2rem;
  cursor: pointer;

  & + & {
    margin-left: 3rem;
  }

  & > svg {
    transition: opacity 0.2s ease;

    :hover {
      opacity: 0.8;
    }
  }
`;

export const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 4rem;
  right: 0;

  width: 18rem;
  background-color: #0f0f0f;
  padding: 0.7rem 0;
  border-radius: 0.2rem;
  z-index: 1;

  @keyframes slide-down {
    from {
      top: 3rem;
      opacity: 0.1;
    }
    to {
      top: 4rem;
      opacity: 1;
    }
  }

  animation: slide-down 0.3s;
`;

export const DropdownItem = styled.span`
  padding: 1rem;
  font-size: 1.4rem;
  border-radius: 0.2rem;

  transition: background-color 0.3s ease;

  :hover {
    background-color: #202020;
  }

  &.danger {
    color: #dc3545;
  }
`;


export const ConfirmScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 40rem;
  min-height: 15rem;

  background-color: #151515;
  padding: 2.5rem;
  z-index: 1;

  strong {
    font-size: 2rem;
    font-weight: 500;
  }

  div.buttons {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 2rem;
  }

  button {
    font-size: 1.5rem;
    color: #fff;
    width: 10rem;
    padding: .8rem 0;
    border: none;
    border-radius: .2rem;
    outline: none;
    opacity: 1;
    transition: opacity .2s ease;
    cursor: pointer;

    :hover {
      opacity: .7;
    }
  }
  button.confirm {
    background-color: #252525;
  }
  button.cancel {
    background-color: red;
  }
  button + button {
    margin-left: 1rem;
  }
`;