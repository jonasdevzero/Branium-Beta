import styled from 'styled-components';

export const Logo = styled.a`
  font-size: 4.8rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  margin-left: 2rem;
  cursor: pointer;
`;

export const StyledLink = styled.a`
  font-size: 2.4rem;
  font-weight: 400;

  line-height: 2rem;
  text-decoration: none;

  padding: 0.9rem 2rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  & + & {
    margin-left: 1.5rem;
  }
  &:hover {
    opacity: 0.7;
  }
`;

export const Container = styled.header`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  padding: 3rem 6rem;
  z-index: 1;

  font-family: 'Noto Sans', sans-serif;

  @media (max-width: 800px) {
    padding: 3rem;

    ${Logo} {
      font-size: 3.5rem;
    }

    ${StyledLink} {
      font-size: 2rem;
    }
  }

  @media (max-width: 500px) {
    justify-content: flex-end;

    ${Logo} {
      display: none;
    }
  }
`;
