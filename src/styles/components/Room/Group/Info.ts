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

  width: 35rem;
  height: 40rem;
  padding: 1.5rem;
  border: solid 0.1rem #151515;

  animation: fade-in .3s;
`;
