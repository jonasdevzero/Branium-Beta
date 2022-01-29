import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  transition: opacity 0.2s ease-in;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

export const Title = styled.h2`
  font-size: 4rem;
  font-weight: 600;
  color: #555;
`;

export const Text = styled.span`
  font-size: 1.8rem;
  color: #555;
  margin-top: 1rem;

  a {
    color: #555;
    text-decoration: underline;
  }
`;
