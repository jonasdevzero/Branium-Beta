import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  position: relative;
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
  position: fixed;
  top: 6rem;
  right: 3rem;

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
      top: 6rem;
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
