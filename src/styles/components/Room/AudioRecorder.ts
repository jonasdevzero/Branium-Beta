import styled from 'styled-components';

export const Container = styled.div`
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
`;

export const AnimationContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 60px;
  width: 10;
  margin: 0 146px;
  padding: 5px 2px;

  .bar {
    height: 1px;
    width: 16px;
    background: #fff;
    margin: 2px;
    animation: up 0.6s linear infinite;
  }

  @keyframes up {
    0% {
      height: 1px;
    }
    50% {
      height: 50px;
    }
    100% {
      height: 1px;
    }
  }

  .bar:nth-child(2) {
    animation-delay: 0.36s;
  }
  .bar:nth-child(3) {
    animation-delay: 0.12s;
  }
  .bar:nth-child(4) {
    animation-delay: 0.24s;
  }
  .bar:nth-child(5) {
    animation-delay: 0.48s;
  }
  .bar:nth-child(6) {
    animation-delay: 0.17s;
  }
  .bar:nth-child(7) {
    animation-delay: 0.5s;
  }
  .bar:nth-child(8) {
    animation-delay: 0.22s;
  }
  .bar:nth-child(9) {
    animation-delay: 0.34s;
  }
  .bar:nth-child(10) {
    animation-delay: 0.41s;
  }
`;

export const Time = styled.span`
  font-size: 1.7rem;
  margin: 1rem 0;
`;

export const StopButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.5rem;
  height: 5.5rem;

  background-color: red;
  margin-top: 2rem;
  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  svg {
    font-size: 3.5rem !important;
  }

  :hover {
    opacity: 0.85;
  }
`;

export const Error = styled.strong`
  font-size: 2.2rem;
`;
