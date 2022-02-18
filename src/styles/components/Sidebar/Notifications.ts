import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45rem;
  height: 35rem;
  border: solid 0.1rem #151515;

  background-color: #131313;
  font-family: 'Noto Sans', sans-serif;
  z-index: 2;

  animation: fade-in .25s;
`;

export const Close = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  svg {
    font-size: 2.3rem;
    color: #fff;
  }

  &:hover {
    opacity: 0.7;
  }
`;
