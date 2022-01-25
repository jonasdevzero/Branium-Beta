import styled from 'styled-components';

type AvatarWrapperProps = {
  size?: string;
};

export const AvatarWrapper = styled.div<AvatarWrapperProps>`
  width: ${({ size }) => (size ? size : '5.5rem')};
  height: ${({ size }) => (size ? size : '5.5rem')};
  border-radius: 50%;
  background-color: lightgray;
  transition: width 0.3s ease, height 0.3s ease;
  position: relative;
  border-radius: 50%;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;
