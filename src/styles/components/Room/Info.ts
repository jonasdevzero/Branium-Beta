import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  background-color: #131313;
  z-index: 2;

  width: 34rem;
  height: 25rem;
  padding: 1.5rem;
  border: solid 0.1rem #151515;
  animation: fade-in .3s;
`;

export const Close = styled.span`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 2.5rem;
  cursor: pointer;
`;

export const Username = styled.span`
  font-size: 2.5rem;
  margin-top: 1rem;
`;

export const Dropdown = styled.div`
  position: absolute;
  bottom: 3rem;
  right: 1.5rem;
  cursor: pointer;
`;

export const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

export const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  width: 18rem;
  position: absolute;
  right: -15rem;
  top: 2.7rem;
  background-color: #0f0f0f;
`;

export const DropdownItem = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 1.4rem;
  padding: 1rem;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #202020;
  }

  &.danger {
    color: #dc3545;
  }
`;
