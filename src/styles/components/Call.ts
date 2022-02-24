import styled from 'styled-components';

type ContainerI = {
  visible: boolean;
};
export const Container = styled.div<ContainerI>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${({ visible }) => (visible ? 100 : -100)};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  background-color: #131313;

  display: flex;
  flex-direction: column;
`;

export const Inner = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 101;
`;

type ScreensI = {
  gridCol: number;
  gridRow: number
}
export const Screens = styled.div<ScreensI>`
  display: grid;
  grid-template-columns: repeat(${({ gridCol }) => gridCol}, 1fr);
  grid-template-rows: repeat(${({ gridRow }) => gridRow}, 1fr);
  grid-gap: 1rem;
  width: 100%;
  height: 90vh;
  padding: 1rem;

  overflow: hidden;
`;

export const VideoBox = styled.div`
  width: 100%;
  min-height: 20rem;
  max-height: fit-content;
  position: relative;

  border: solid thin #191818;

  div.avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  span.username {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    font-size: 1.8rem;
  }
  span.mic {
    position: absolute;
    top: 2rem;
    right: 2rem;

    background-color: #353535;
    padding: 0.7rem;
    border-radius: 50%;

    svg {
      font-size: 1.7rem;
    }
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const OptionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10vh;
  position: relative;

  background-color: #090909;
`;

export const Option = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;

  background-color: transparent;
  margin: 0 1.5rem;
  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  &.call__end {
    background-color: red;
  }

  svg {
    color: #fff;
    font-size: 2.5rem;
  }
`;

export const Minimize = styled.button`
  position: absolute;
  top: 50%;
  right: 3.5rem;
  transform: translateY(-50%);

  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  svg {
    color: #fff;
    font-size: 2.5rem;
  }
`;

export const EventScreen = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #131313;
  z-index: 102;

  strong {
    font-size: 2.8rem;
    font-weight: 500;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5.5rem;
    height: 5.5rem;

    background-color: transparent;
    border: solid thin #252525;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    opacity: 1;
    transition: opacity .3s ease;

    svg {
      color: #fff;
      font-size: 2.8rem;
    }

    :hover {
      opacity: .8;
    }
  }

  button.close {
    background-color: red;
    margin-top: 1.5rem;    
  }
  button.accept {
    background-color: green;
  }
  button.reject {
    background-color: red;
  }

  div.buttons {
    display: flex;
    margin-top: 2.5rem;

    button + button {
      margin-left: 1.5rem;
    }
  }
`;
