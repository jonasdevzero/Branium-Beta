import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  h4 {
    font-size: 2.2rem;
    font-weight: 500;
  }

  span {
    font-size: 1.4rem;

    svg {
      font-size: 1.1rem;
      color: red;
    }
  }
`;

export const Content = styled.div`
  display: flex;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;

  h5 {
    font-size: 2rem;
    font-weight: 500;
  }

  & + & {
    margin-left: 10rem;
  }

  @media (max-width: 600px) {
    & + & {
      margin-left: 7rem;
    }
  }

  @media (max-width: 450px) {
    & + & {
      margin-left: 3rem;
    }
  }
`;

export const StyledLink = styled.a`
  font-size: 1.8rem;
  font-weight: 400;

  color: lightgray;
  text-decoration: none;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Container = styled.footer`
  display: flex;
  height: 30rem;
  background-color: #0d0d0d;
  padding: 3rem 7rem;
  font-family: 'Red Hat Text', sans-serif;

  hr {
    margin: 0 7rem;
  }

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    height: fit-content;

    hr {
      display: none;
    }

    ${Card} {
      align-items: flex-start;
      margin-top: 4rem;

      h4 {
        margin-bottom: 2rem;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 3rem;
  }
`;
