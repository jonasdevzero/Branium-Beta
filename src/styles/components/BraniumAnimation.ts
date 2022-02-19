import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

export const Card = styled.div`
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

  z-index: -1;

  box-shadow: inset 0 0 15rem #191919, 0 0 1.5rem #181818;

  span {
    color: #303030;
    font-size: 2.7rem;
  }
`;

export const RowVertical = styled.div`
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
    background-color: green;
    box-shadow: 0 0 1.5rem #fff;
  }
`;

export const RowV1 = styled(RowVertical)`
  top: 0;
  left: 35%;

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
  left: 38%;

  transform: translateX(-38%);

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

export const RowHorizontal = styled.div`
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
    background-color: #198754;
    background-color: green;
    box-shadow: 0 0 1.5rem #fff;
  }
`;

export const RowH1 = styled(RowHorizontal)`
  top: 47%;
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
      right: 16.4vw;
    }
    100% {
      top: 79.5%;
      right: 16.4vw;
    }
  }

  &::after {
    animation: animate-row-v1g4 10s infinite;
  }
`;

export const RowH1G4 = styled(RowHorizontal)`
  top: 75%;
  left: 36.5%;
  width: 16.7%;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

export const RowV2G4 = styled(RowVertical)`
  bottom: 25%;
  left: 36.5%;
  height: 15%;
  z-index: -2;

  &::after {
    background-color: transparent;
    box-shadow: none;
  }
`;

/* ---------- Group 5 ---------- */
