import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #131313;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 8rem;
  padding: 0 5rem;
`;

export const Close = styled.span`
  font-size: 2.2rem;
  cursor: pointer;
  margin-left: auto;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 12rem);

  h2 {
    margin-top: 2rem;
  }
`;
