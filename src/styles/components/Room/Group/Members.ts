import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 22rem;
  height: 100vh;

  background-color: #101010;
  padding: 1rem;
  padding-top: 2.5rem;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0.4rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #303030;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #252525;
    cursor: pointer;
  }
`;

export const Users = styled.div`
  & + & {
    margin-top: 3rem;
  }

  h4 {
    font-size: 1.4rem;
    font-weight: 500;
    color: lightgray;
    letter-spacing: 0.05rem;

    margin-bottom: 0.7rem;
  }
`;

export const Member = styled.div`
  display: flex;
  align-items: center;

  padding: 0.7rem;
  border-radius: 0.3rem;
  overflow-x: hidden;

  cursor: pointer;

  :hover {
    background-color: #222;
  }

  h5 {
    font-size: 1.4rem;
    font-weight: 400;
    margin-left: 1rem;
  }

  span.status {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    margin-left: 1rem;

    background-color: lightgray;
  }
  span.status.online {
    background-color: green;
  }

  & + & {
    margin-top: 1.5rem;
  }
`;
