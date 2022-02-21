import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;

  --balloon-color: #212121;

  &.unview {
    div.balloon__1 {
      left: -7rem;
    }
    div.balloon__2 {
      right: -7rem;
    }
    span.row {
      display: none;
    }
  }

  @keyframes animate-balloon-row {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }

  div.balloon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    background-color: var(--balloon-color);
    border-radius: 2rem;
    padding: 3rem 2.8rem;

    transition: left 3s ease, right 3s ease;

    ::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 0;
      height: 0;
    }
  }

  div.balloon__1 {
    width: 27rem;
    height: 15rem;
    margin-bottom: 3rem;
    left: 0;

    ::after {
      left: -1.5rem;
      border-top: 4.5rem solid transparent;
      border-right: 3.5rem solid;
      border-right-color: var(--balloon-color);
    }

    span.row:nth-child(1) {
      width: 70%;
      ::after {
        width: 100%;
        animation: animate-balloon-row 2s;
      }
    }
    span.row:nth-child(2) {
      width: 60%;
      ::after {
        width: 100%;
        animation: animate-balloon-row 2.6s;
      }
    }
    span.row:nth-child(3) {
      width: 85%;
      ::after {
        width: 100%;
        animation: animate-balloon-row 2.6s;
      }
    }
    span.row:nth-child(4) {
      width: 73%;
      ::after {
        width: 100%;
        animation: animate-balloon-row 3.8s;
      }
    }
  }

  div.balloon__2 {
    width: 25rem;
    height: 12rem;
    align-self: flex-end;
    align-items: flex-end;
    right: 0;

    ::after {
      right: -1.5rem;
      border-top: 4.5rem solid transparent;
      border-left: 3.5rem solid;
      border-left-color: var(--balloon-color);
    }

    span.row-reverse:nth-child(1) {
      width: 80%;
      ::after {
        width: 100%;
        animation: animate-balloon-row 2s;
      }
    }
    span.row-reverse:nth-child(2) {
      width: 65%;
      ::after {
        width: 100%;
        animation: animate-balloon-row 3.5s;
      }
    }
    span.row-reverse:nth-child(3) {
      width: 90%;
      ::after {
        width: 100%;
        animation: animate-balloon-row 3s;
      }
    }
  }

  span.row {
    width: 100%;
    position: relative;
    transition: width 1s ease;

    ::after {
      content: '';
      position: absolute;
      left: 0;
      width: 0.1rem;
      height: 0.2rem;
      background-color: white;
    }
  }

  span.row-reverse {
    &::after {
      left: unset;
      right: 0;
    }
  }

  @media (max-width: 550px) {
    display: none;
  }
`;