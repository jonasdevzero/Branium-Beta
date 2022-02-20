import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;

  overflow: hidden;
`;

export const Col = styled.div`
  position: absolute;
  top: 100vh;
  display: flex;
  flex-direction: column;

  font-size: 3rem;
  color: #252525;

  @keyframes binary-up {
    0% {
      top: 100vh;
      opacity: 1;
    }
    100% {
      top: 15vh;
      opacity: 0;
    }
  }

  animation: binary-up 15s infinite;
  animation-delay: 4s;
`;

export const Col1 = styled(Col)`
  left: 2vw;
  animation-delay: 2s;
`;

export const Col2 = styled(Col)`
  left: 12vw;
  animation-delay: 3s;
  animation-duration: 12s;
`;

export const Col3 = styled(Col)`
  left: 15vw;
  animation-delay: 5s;
`;

export const Col4 = styled(Col)`
  left: 21vw;
  animation-delay: 7s;
  animation-duration: 17s;
`;

export const Col5 = styled(Col)`
  left: 27vw;
  animation-delay: 1s;
`;

export const Col6 = styled(Col)`
  left: 33vw;
  animation-delay: 3.7s;
  animation-duration: 11s;
`;

export const Col7 = styled(Col)`
  left: 35vw;
  animation-delay: 5.5s;
`;

export const Col8 = styled(Col)`
  left: 39vw;
  animation-delay: 1.7s;
  animation-duration: 16s;
`;

export const Col9 = styled(Col)`
  left: 43vw;
  animation-delay: 7s;
`;

export const Col10 = styled(Col)`
  left: 49vw;
  animation-delay: 2.2s;
  animation-duration: 11.5s;
`;

export const Col11 = styled(Col)`
  left: 53vw;
  animation-delay: 4.5s;
`;

export const Col12 = styled(Col)`
  left: 57vw;
  animation-delay: 6s;
  animation-duration: 14s;
`;

export const Col13 = styled(Col)`
  left: 62vw;
  animation-delay: 2.5s;
`;

export const Col14 = styled(Col)`
  left: 69vw;
  animation-delay: 7.8s;
  animation-duration: 15.5s;
`;

export const Col15 = styled(Col)`
  left: 73vw;
  animation-delay: 4s;
`;

export const Col16 = styled(Col)`
  left: 78vw;
  animation-delay: 5s;
  animation-duration: 18s;
`;

export const Col17 = styled(Col)`
  left: 85vw;
  animation-delay: 3s;
`;

export const Col18 = styled(Col)`
  left: 93vw;
  animation-delay: 1s;
  animation-duration: 12.5s;
`;
