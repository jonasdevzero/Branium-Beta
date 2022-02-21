import styled from 'styled-components';

type ContainerI = {
  color: string;
}
export const Container = styled.div<ContainerI>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;

  --cpu-c: ${({ color }) => color};
`;

export const Core = styled.div`
  position: absolute;
  top: 50%;
  left: 35%;
  transform: translateY(-50%) translateX(-35%);

  display: flex;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: 15rem;

  background-color: #181818;
  border-radius: 2rem;
  transition: box-shadow .5s ease;

  z-index: -1;

  box-shadow: inset 0 0 15rem #191919, 0 0 1.5rem #181818, 0 0 0.5rem var(--cpu-c),
    inset 0 0 2rem var(--cpu-c);


  span {
    color: #303030;
    font-size: 2.7rem;
  }
`;

export const RowVertical = styled.span`
  position: absolute;
  width: 0.3rem;
  height: 50vh;
  background-color: #191919;

  z-index: -1;

  &::after {
    content: '';
    position: absolute;
    width: 0.3rem;
    height: 0.3rem;
    background-color: var(--cpu-c);
    box-shadow: 0 0 1.5rem #fff, 0 0 0.8rem #191919;
    transition: background-color .5s ease;
  }
`;

export const RowHorizontal = styled.span`
  position: absolute;
  width: 35vw;
  height: 0.3rem;
  background-color: #191919;

  z-index: -1;

  &::after {
    content: '';
    position: absolute;
    width: 0.3rem;
    height: 0.3rem;
    background-color: var(--cpu-c);
    box-shadow: 0 0 1.5rem #fff, 0 0 0.8rem #191919;
    transition: background-color .5s ease;
  }
`;

export const RowV1 = styled(RowVertical)`
  top: 0;
  left: 35.3%;

  transform: translateX(-35%);

  @keyframes animate-row-v1 {
    from {
      top: 0;
    }
    to {
      top: 50vh;
    }
  }

  &::after {
    top: 0;
    animation: animate-row-v1 7s infinite;
    animation-delay: 0.3s;
  }
`;

export const RowV2 = styled(RowVertical)`
  bottom: 0;
  left: 39%;

  @keyframes animate-row-v2 {
    from {
      bottom: 0;
    }
    to {
      bottom: 50vh;
    }
  }

  &::after {
    bottom: 0;
    animation: animate-row-v2 6s infinite;
    animation-delay: 0.9s;
  }
`;

export const RowH1 = styled(RowHorizontal)`
  top: 47.5%;
  left: 0;

  transform: translateY(-48%);

  @keyframes animate-row-h1 {
    from {
      left: 0;
    }
    to {
      left: 35vw;
    }
  }

  &::after {
    left: 0;

    animation: animate-row-h1 7s infinite;
    animation-delay: 1s;
  }
`;

export const RowH2 = styled(RowHorizontal)`
  width: 65vw !important;
  top: 52%;
  right: 0;

  transform: translateY(-52%);

  @keyframes animate-row-h2 {
    from {
      right: 0;
    }
    to {
      right: 65vw;
    }
  }

  &::after {
    right: 0;

    animation: animate-row-h2 7s infinite;
    animation-delay: 0.1s;
  }
`;

// Rows Group

/* ---------- Group 1 ---------- */

export const RowV1G1 = styled(RowVertical)`
  bottom: 0;
  left: 65%;
  height: 55vh;

  transform: translateX(-65%);

  @keyframes animate-row-vg1 {
    0% {
      bottom: 0;
      left: 0;
    }
    50% {
      bottom: 54.8vh;
      left: 64.7%;
    }
    100% {
      bottom: 54.8vh;
      left: calc(-23.6vw - 65%);
    }
  }

  &::after {
    bottom: 0;
    animation: animate-row-vg1 7s infinite;
  }
`;

export const RowH1G1 = styled(RowHorizontal)`
  bottom: 54.5%;
  left: 56.8%;
  width: 23.6vw;
  z-index: -2;

  transform: translateX(-65%) translateY(-65%);

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

/* ---------- Group 2 ---------- */

export const RowH1G2 = styled(RowHorizontal)`
  top: 25%;
  left: 0;

  width: 20%;

  @keyframes animate-row-h1g2 {
    0% {
      left: 0;
    }
    33% {
      top: 25%;
      left: 20%;
    }
    66% {
      left: 20%;
      top: 55%;
    }
    100% {
      top: 55%;
      left: calc(20% + 17.8rem);
    }
  }

  &::after {
    position: fixed;
    animation: animate-row-h1g2 8s infinite;
  }
`;

export const RowV1G2 = styled(RowVertical)`
  top: 25%;
  left: 20%;
  height: 30%;
  z-index: -2;

  &::after {
    position: absolute;
    background-color: transparent;
    box-shadow: none;
  }
`;

export const RowH2G2 = styled(RowHorizontal)`
  top: calc(55%);
  left: 20%;
  width: 17.8rem;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

/* ---------- Group 3 ---------- */

export const RowV1G3 = styled(RowVertical)`
  left: 25%;
  bottom: 0;
  height: 68%;

  @keyframes animate-row-v1g3 {
    0% {
      bottom: 0;
    }
    33% {
      bottom: 68vh;
      left: 0;
    }
    66% {
      bottom: 68vh;
      left: 11.9vw;
    }
    100% {
      bottom: 59.5vh;
      left: 11.9vw;
    }
  }

  &::after {
    bottom: 0;

    animation: animate-row-v1g3 9s infinite;
  }
`;

export const RowH1G3 = styled(RowHorizontal)`
  left: 25%;
  bottom: 68%;
  width: 12%;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

export const RowV2G3 = styled(RowVertical)`
  top: 31.7%;
  left: 37%;
  height: 8.5%;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

/* ---------- Group 4 ---------- */

export const RowV1G4 = styled(RowVertical)`
  top: 0;
  left: 53%;
  height: 75%;

  @keyframes animate-row-v1g4 {
    0% {
      top: 0;
    }
    33% {
      top: 100%;
      right: 0;
    }
    66% {
      top: 100%;
      right: 16vw;
    }
    100% {
      top: 79.5%;
      right: 16vw;
    }
  }

  &::after {
    animation: animate-row-v1g4 10s infinite;
  }
`;

export const RowH1G4 = styled(RowHorizontal)`
  top: 75%;
  left: 37%;
  width: 16.3%;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

export const RowV2G4 = styled(RowVertical)`
  bottom: 25%;
  left: 37%;
  height: 15%;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

/* ---------- Group 5 ---------- */

export const RowH1G5 = styled(RowHorizontal)`
  left: 0;
  bottom: 12%;
  width: 35vw;

  @keyframes animate-row-h1g5 {
    0% {
      left: 0;
      bottom: 0;
    }
    60% {
      left: 35vw;
      bottom: 0;
    }
    100% {
      left: 35vw;
      bottom: 28vh;
    }
  }

  &::after {
    animation: animate-row-h1g5 11s infinite;
  }
`;

export const RowV1G5 = styled(RowVertical)`
  left: 35vw;
  bottom: 12%;
  height: 28vh;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

/* ---------- Group 6 ---------- */

export const RowH1G6 = styled(RowHorizontal)`
  top: 12%;
  right: 0;
  width: 61vw;

  @keyframes animate-row-h1g6 {
    0% {
      right: 0;
    }
    65% {
      right: 61vw;
      top: 0;
    }
    100% {
      right: 61vw;
      top: 34vh;
    }
  }

  &::after {
    left: none;
    right: 0;
    animation: animate-row-h1g6 12s infinite;
  }
`;

export const RowV1G6 = styled(RowVertical)`
  top: 12%;
  right: 61vw;
  height: 30vh;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

/* ---------- Group 7 ---------- */

export const RowV1G7 = styled(RowVertical)`
  top: 0;
  right: 15%;
  height: 48.5vh;

  @keyframes animate-row-v1g7 {
    0% {
      top: 0;
    }
    40% {
      top: 48.5vh;
      right: 0;
    }
    100% {
      top: 48.5vh;
      right: 43.6vw;
    }
  }

  &::after {
    animation: animate-row-v1g7 7s infinite;
  }
`;

export const RowH1G7 = styled(RowHorizontal)`
  top: 48.5vh;
  right: 15%;
  width: 43.6vw;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

/* ---------- Group 8 ---------- */

export const RowV1G8 = styled(RowVertical)`
  bottom: 0;
  left: 12%;
  height: 48.5vh;

  @keyframes animate-row-v1g8 {
    0% {
      bottom: 0;
    }
    50% {
      bottom: 48.5vh;
      left: 0;
    }
    100% {
      bottom: 48.5vh;
      left: 19.5vw;
    }
  }

  &::after {
    top: none;
    bottom: 0;
    animation: animate-row-v1g8 7s infinite;
  }
`;

export const RowH1G8 = styled(RowHorizontal)`
  left: 12%;
  bottom: 48.5vh;
  width: 19.5%;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

/* ---------- Group 9 ---------- */

export const RowH1G9 = styled(RowHorizontal)`
  left: 0;
  bottom: 18%;
  width: 59vw;

  @keyframes animate-row-h1g9 {
    0% {
      left: 0;
    }
    50% {
      left: 59vw;
      bottom: 0;
    }
    75% {
      left: 59vw;
      bottom: 27vh;
    }
    100% {
      left: 41vw;
      bottom: 27vh;
    }
  }

  &::after {
    animation: animate-row-h1g9 8s infinite;
    animation-delay: 2s;
  }
`;

export const RowV1G9 = styled(RowVertical)`
  bottom: 18%;
  left: 59vw;
  height: 27vh;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

export const RowH2G9 = styled(RowHorizontal)`
  left: 41.2vw;
  bottom: 45vh;
  width: 18vw;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

/* ---------- Group 10 ---------- */

export const RowH1G10 = styled(RowHorizontal)`
  right: 0;
  top: 19%;
  width: 86vw;

  @keyframes animate-row-h1g10 {
    0% {
      right: 0;
    }
    60% {
      right: 86vw;
      top: 0;
    }
    80% {
      right: 86vw;
      top: 25vh;
    }
    100% {
      right: 66vw;
      top: 25vh;
    }
  }

  &::after {
    left: none;
    right: 0;
    animation: animate-row-h1g10 11s infinite;
  }
`;

export const RowV1G10 = styled(RowVertical)`
  right: 86vw;
  top: 19%;
  height: 25vh;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

export const RowH2G10 = styled(RowHorizontal)`
  top: 44vh;
  left: 13.2vw;
  width: 20.3vw;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

/* ---------- Group 11 ---------- */

export const RowH1G11 = styled(RowHorizontal)`
  right: 0;
  bottom: 33%;
  width: 66.7vw;

  @keyframes animate-row-h1g11 {
    0% {
      right: 0;
    }
    85% {
      right: 66.7vw;
      bottom: 0;
    }
    100% {
      right: 66.7vw;
      bottom: 7vh;
    }
  }

  &::after {
    left: none;
    right: 0;
    animation: animate-row-h1g11 10s infinite;
  }
`;

export const RowV1G11 = styled(RowVertical)`
  right: 66.7vw;
  bottom: 33%;
  height: 7vh;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

/* ---------- Group 12 ---------- */

export const RowH1G12 = styled(RowHorizontal)`
  left: 0;
  bottom: 30%;
  width: 17vw;

  @keyframes animate-row-h1g12 {
    0% {
      left: 0;
    }
    20% {
      left: 17vw;
      bottom: 0;
    }
    50% {
      left: 17vw;
      bottom: 57vh;
    }
    75% {
      left: 33.4vw;
      bottom: 57vh;
    }
    100% {
      left: 33.4vw;
      bottom: 30vh;
    }
  }

  &::after {
    animation: animate-row-h1g12 13s infinite;
  }
`;

export const RowV1G12 = styled(RowVertical)`
  left: 17vw;
  bottom: 30%;
  height: 57vh;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

export const RowH2G12 = styled(RowHorizontal)`
  left: 17vw;
  bottom: 87vh;
  width: 16.6vw;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

export const RowV2G12 = styled(RowVertical)`
  top: 13vh;
  left: 33.4vw;
  height: 27vh;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;
