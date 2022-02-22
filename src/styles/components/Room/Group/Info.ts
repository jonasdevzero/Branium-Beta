import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  background-color: #131313;
  z-index: 2;

  width: 30rem;
  min-height: 40rem;
  padding: 2.5rem 3rem;
  border: solid 0.1rem #151515;

  animation: fade-in 0.3s;
`;

export const Close = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 1;
  transition: opacity 0.2s ease;
  cursor: pointer;

  svg {
    font-size: 2.5rem;
  }

  :hover {
    opacity: 0.7;
  }
`;

export const Edit = styled(Close)`
  top: 1.3rem;
  right: 4.5rem;

  svg {
    font-size: 2rem;
  }
`;

export const Name = styled.h4`
  font-size: 2.5rem;
  margin-top: 1.5rem;
`;

export const MembersCount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 0;
  right: 0;

  width: 100%;
  height: 0;
  margin: 1.5rem 0;
  border-top: thin solid #272727;

  span {
    color: #aaa;
    font-size: 1.3rem;
    background-color: #131313;
    padding: 0 0.5rem;
    z-index: 1;
  }
`;

export const DescriptionTitle = styled.span`
  width: 100%;
  font-size: 1.3rem;
  color: #aaa;
  margin-top: 1rem;
`;

export const Description = styled.p`
  width: 100%;
  margin-top: 0.5rem;
  font-size: 1.5rem;
  text-align: justify;
  max-height: 10rem;
`;
