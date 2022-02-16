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
  position: relative;

  padding: 0.25rem 3rem;
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

export const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 0;
  right: 0;

  height: 0;
  margin: 3rem 0;
  border-top: thin solid #272727;

  span {
    color: #777;
    font-size: 1.2rem;
    background-color: #151515;
    padding: 0 .5rem;
    z-index: 1;
  }
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
  border: solid 0.2rem #000;
  outline: none;
  border-radius: 50%;
  cursor: pointer;

  svg {
    font-size: 2.5rem;
  }
`;

export const Actions = styled.div`
  position: absolute;
  cursor: pointer;

  &.sender {
    left: 1rem;
    top: -1.5rem;
  }
  &.receiver {
    right: 1rem;
    top: -1.5rem;
  }
  &.hidden {
    display: none;
  }

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 3rem;
    background-color: #181818;

    border: solid 0.1rem #121212;
    border-radius: 0.5rem;

    transition: opacity 0.3s ease, box-shadow 0.1s ease-in;

    :hover {
      opacity: 0.6;
      box-shadow: 0px 0.2rem rgba(0, 0, 0, 0.7);
    }
  }

  svg {
    font-size: 1.8rem;
  }
`;

export const ActionsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  position: absolute;
  top: 0;

  background-color: #090909;
  border-radius: 0.5rem;
  padding: 0.8rem 1rem;
  z-index: 1;

  &.sender {
    right: -21rem;
  }
  &.receiver {
    left: -21rem;
  }
`;

export const Action = styled.button`
  background-color: transparent;
  border: none;
  outline: none;

  font-size: 1.4rem;
  color: #ccc;
  padding: 1rem 0;
  border-radius: 0.3rem;

  cursor: pointer;
  transition: background-color 0.2s ease;

  :hover {
    background-color: #151515;
  }
`;
