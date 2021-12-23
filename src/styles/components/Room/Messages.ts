import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 12rem);

  display: flex;
  flex-direction: column;
  padding: 2rem 5rem;

  overflow-y: scroll;
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

  padding: 0 3rem;
  margin-top: 1.5rem;

  &.concat {
    margin-top: 0.4rem;
  }

  &.sender {
    align-items: flex-end;
  }
`;

export const Content = styled.div`
  background-color: #222;
  padding: .3rem;
  border-radius: .5rem;
  position: relative;
`;

export const Inner = styled.div`
  padding: .5rem;
`;

export const Medias = styled.div`
  margin-bottom: .7rem;

  img {
    max-width: 20rem;
    max-height: 20rem;
    width: 100%;
    height: 100%;
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
  width: 4.5rem;
  height: 4.5rem;
  position: absolute;
  bottom: 7rem;
  right: 1.4rem;

  background-color: #090909;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 50%;
  cursor: pointer;

  svg {
    font-size: 2rem;
  }
`;
