import styled from 'styled-components';

export const Container = styled.div`
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

  max-width: 30vw;
  max-height: 25rem;
  width: fit-content;
  height: fit-content;

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

export const Document = styled.div`
  display: flex;
  align-items: center;
  min-width: 20rem;
  max-width: 25rem;
  min-height: 4rem;

  padding: 0.7rem;
  padding-bottom: 0;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    margin-right: 1rem;

    span {
      font-size: 1.3rem;
      background-color: #191919;
      padding: 0.2rem 1.5rem;

      position: absolute;
      bottom: -2.2rem;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 4.5rem;
      min-height: 4.5rem;

      border: solid 0.1rem #777;
      border-radius: 50%;
      transition: opacity 0.3s ease;

      svg {
        font-size: 1.6rem;
      }

      :hover {
        opacity: 0.7;
      }
    }
  }

  p {
    font-size: 1.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    :hover {
      white-space: normal;
    }
  }
`;

export const ImageGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  max-width: 30vw;

  background-color: transparent;
  border: none;
  outline: none;

  cursor: pointer;

  span.plus {
    position: absolute;
    bottom: 25%;
    right: 25%;
    transform: translateY(50%) translateX(50%);

    font-size: 4rem;
    color: #fff;;
  };
`;

export const ImageGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 15vw;
  height: fit-content;
  max-height: 15rem;

  overflow: hidden;
  transition: opacity .2s ease;

  span {
    position: unset !important;
    padding: .2rem !important;
  }

  img {
    width: 100% !important;
    height: 100% !important;
    position: relative !important;
    object-fit: contain !important;
  }

  &.plus {
    opacity: .6;
  }

  :hover {
    opacity: .5;
  }
`;
