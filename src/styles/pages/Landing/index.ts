import styled from 'styled-components';

export const Landing = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  div.text {
    margin-top: 10rem;
  }
`;

export const LandingText = styled.h1`
  font-size: 8rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  max-width: 90rem;
  text-align: center;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 45rem;
  border-top: thin solid #141414;

  &.info {
    height: 45rem;
    padding: 2rem 0;
  }
`;

export const CallToAction = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28rem;
  height: 7rem;

  color: #ddd;
  font-size: 2.4rem;
  background-color: #131313;
  margin-top: 3rem;
  border: thin solid green;
  border-radius: 1.5rem;
  box-shadow: inset 0 0 1.5rem green, 0 0 1rem green;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 600px) {
    font-size: 2rem;
    width: 23rem;
    height: 6rem;
  }
`;

export const SlideDown = styled.button`
  position: relative;
  color: #fff;
  background-color: transparent;
  margin-top: 3rem;
  border: none;
  outline: none;
  cursor: pointer;

  svg {
    font-size: 4rem;
  }

  @keyframes up-down {
    0% {
      top: 0;
    }
    50% {
      top: 1rem;
    }
    100% {
      top: 0;
    }
  }

  animation: up-down 3s infinite;
`;

export const SectionInner = styled.div`
  max-width: 80%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    max-width: 40%;
    width: 100%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 46%;
  font-family: 'Red Hat Text', sans-serif;
  transition: opacity 1.5s ease-in;
  opacity: 1;

  h2 {
    font-size: 6.5rem;
    font-weight: 500;
    max-width: 45rem;
  }

  p {
    font-size: 2.8rem;
    margin-top: 2rem;
  }

  &#section__info-1.unview,
  &#section__info-2.unview {
    opacity: 0;
  }
`;

export const Features = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 40rem;
  position: relative;
  left: 0;
  transition: left 3s ease, opacity 1.5s ease-in;

  & > div.row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 3rem;
  }

  &.unview {
    left: -5rem;
    opacity: 0;
  }
`;

export const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 15rem;

  cursor: pointer;

  &:hover {
    span > svg {
      transform: translateY(-0.5rem);
    }
  }
`;

export const FeatureIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;

  border-bottom: solid thin #ddd;

  svg {
    transition: 0.3s transform ease-in-out;
    font-size: 4.5rem;
  }
`;

export const FeatureText = styled.span`
  height: 4.2rem;
  margin-top: 1rem;
  font-size: 1.8rem;
  font-family: 'Raleway', sans-serif;
  max-width: 10rem;
  text-align: center;
`;

export const CallToActionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 5rem;
    font-family: 'Noto Sans', sans-serif;
    font-weight: 500;
    text-align: center;
  }
  a {
    background-color: #131313;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  animation: fade-in 1s;
  scroll-behavior: smooth;

  @media (max-width: 1100px) {
    ${Info} {
      h2 {
        font-size: 4.5rem;
      }
      p {
        font-size: 2rem;
      }
    }

    ${Feature} {
      height: 10rem;
      width: 10rem;

      ${FeatureIcon} {
        height: 7rem;
        width: 7rem;
        border: none;

        svg {
          font-size: 3.5rem;
        }
      }

      ${FeatureText} {
        font-size: 1.5rem;
      }
    }

    ${CallToActionCard} {
      h3 {
        font-size: 4rem;
      }
    }
  }

  @media (max-width: 900px) {
    ${Landing} > h1 {
      font-size: 5rem;
      max-width: 70rem;
    }

    ${CallToActionCard} {
      h3 {
        font-size: 4rem;
      }
    }
  }

  @media (max-width: 800px) {
    ${Section}.info {
      height: fit-content;
      padding: 7rem 0;
    }

    .section__image {
      width: 90% !important;
    }

    ${Info} {
      h2 {
        font-size: 3.5rem;
      }
      p {
        font-size: 1.7rem;
      }
    }

    ${Features} > div.row {
      margin-top: 1.5rem;
    }

    ${Feature} {
      height: 7rem;
      width: 7rem;

      ${FeatureText} {
        display: none;
      }
    }

    ${CallToActionCard} {
      h3 {
        font-size: 3rem;
      }
    }
  }

  @media (max-width: 600px) {
    ${Landing} {
      h1 {
        font-size: 4rem;
      }
    }

    ${CallToActionCard} {
      h3 {
        font-size: 2.5rem;
      }
    }
  }

  @media (max-width: 550px) {
    ${Features} {
      display: none;
    }

    ${Info} {
      max-width: 100%;

      P {
        font-size: 2rem;
      }
    }
  }
`;
