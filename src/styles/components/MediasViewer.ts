import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

export const Close = styled.button`
  position: fixed;
  top: 5rem;
  right: 6rem;
  border: none;
  outline: none;
  background-color: transparent;

  font-size: 3rem;
  color: #fff;
  cursor: pointer;
  z-index: 1;
`;

export const ImageContainer = styled.div`
  max-width: 80vw;
  max-height: 70vh;
  width: 100%;
  height:100%;

  transition: opacity 0.2s ease;

  img {
      width: 100%;
      height: 100%;
      object-fit: contain;
  }
`;
