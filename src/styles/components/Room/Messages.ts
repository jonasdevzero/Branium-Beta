import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 12rem);

  display: flex;
  flex-direction: column;
  padding: 2rem 5rem;

  overflow-y: scroll;

  &.group {
    padding: 2rem 8rem;
  }

  ::-webkit-scrollbar {
    width: 0.7rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #303030;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #252525;
    cursor: pointer;
  }
`;

export const LoadingMessages = styled.div`
  position: absolute;
  top: 8rem;
  left: 50%;
  padding: 0.5rem 0.5rem 0.3rem 0.5rem;
  background-color: #1e1e1e;
  border-radius: 0.3rem;

  transform: translateX(-50%);
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  
  padding: .25rem 3rem;
  margin-top: 1.5rem;
  
  :hover {
    background-color: #131313;
  }

  &.concat {
    margin-top: 0.4rem;
  }

  &.sender {
    align-items: flex-end;
  }
`;

export const Sender = styled.div`
  display: flex;
  position: relative;
  left: -5.5rem;
  bottom: -2rem;
  margin-bottom: 0.5rem;

  span {
    color: lightgray;
    margin-top: 1rem;
    margin-left: 1rem;
  }

  &.reverse {
    flex-direction: row-reverse;
    left: 5.5rem;

    span {
      margin-left: 0;
      margin-right: 1rem;
    }
  }
`;

export const Content = styled.div`
  background-color: #222;
  padding: 0.3rem;
  border-radius: 0.5rem;
  position: relative;
`;

export const Inner = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.1rem;

  &.no__text {
    margin-bottom: 0.5rem;
  }
`;

export const Medias = styled.div`
  display: flex;
  margin-bottom: 0.7rem;

  &.audio {
    margin-bottom: 0;
  }

  video {
    max-width: 50rem;
  }
`;

export const ImageContainer = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  outline: none;

  max-width: 25vw;
  max-height: 20rem;
  width: 100%;
  height: 100%;

  cursor: pointer;
  transition: opacity 0.2s ease;
  overflow: hidden;

  span {
    position: unset !important;
  }

  img {
    width: 100% !important;
    position: relative !important;
    height: unset !important;
    object-fit: contain;
  }

  :hover {
    opacity: 0.8;
  }
`;

export const Text = styled.span`
  font-size: 1.5rem;
  width: max-content;
  margin-right: 6rem;
  line-height: 2rem;
  white-space: pre-wrap;
  flex-wrap: wrap;
  padding-bottom: 0.5rem;
`;

export const User = styled.div`
  display: flex;
  position: absolute;
  position: absolute;
  left: -3rem;
  top: -2.5rem;
`;

export const Username = styled.span`
  font-size: 1.4rem;
  margin-top: 0.5rem;
  margin-left: 1.5rem;
`;

export const Date = styled.span`
  font-size: 1.6rem;

  margin: 1.5rem auto 0 auto;
  padding: 1rem 2rem;
  background-color: #222;
  border-radius: 1rem;
`;

export const Time = styled.span`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;

  font-size: 1.1rem;
  color: lightgray;
`;

export const ScrollToBottom = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  position: absolute;
  bottom: 7rem;
  right: 1rem;

  background-color: #090909;
  color: #fff;
  border: solid .2rem #000;
  outline: none;
  border-radius: 50%;
  cursor: pointer;

  svg {
    font-size: 2.5rem;
  }
`;
