import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 30rem;

  padding: 1rem;
  border-radius: 0.3rem;
  font-size: 100%;
`;

export const PlayPauseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4rem;
  height: 4rem;

  background-color: #151515 !important;
  border: none;
  outline: none;
  border-radius: 50%;
  margin-right: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  svg {
    color: #fff;
  }

  :hover {
    background-color: #070707 !important;
  }
`;

export const RangeContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const ProgressBar = styled.input`
  width: 100%;

  --bar-bg: #333;
  --seek-before-width: 0;
  --seek-before-color: #252525;
  --knobby: #555;
  --selectedKnobby: #444;

  appearance: none;
  background: var(--bar-bg);
  border-radius: 10px;
  position: relative;
  width: 100%;
  height: 7px;
  outline: none;

  /* progress bar - safari */
  ::-webkit-slider-runnable-track {
    background: var(--bar-bg);
    border-radius: 10px;
    position: relative;
    width: 100%;
    height: 7px;
    outline: none;
  }

  /* progress bar - firefox */
  ::-moz-range-track {
    background: var(--bar-bg);
    border-radius: 10px;
    position: relative;
    width: 100%;
    height: 7px;
    outline: none;
  }

  ::-moz-focus-outer {
    border: 0;
  }

  /* progress bar - chrome and safari */
  :before {
    content: '';
    height: 7px;
    width: var(--seek-before-width);
    background-color: var(--seek-before-color);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
  }

  /* progress bar - firefox */
  ::-moz-range-progress {
    background-color: var(--seek-before-color);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    height: 7px;
  }

  /* knobby - chrome and safari */
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 11px;
    width: 11px;
    border-radius: 50%;
    border: none;
    background-color: var(--knobby);
    cursor: pointer;
    position: relative;
    margin: -2px 0 0 0;
    z-index: 3;
    box-sizing: border-box;
  }

  /* knobby while dragging - chrome and safari */
  :active::-webkit-slider-thumb {
    transform: scale(1.2);
    background: var(--selectedKnobby);
  }

  /* knobby - firefox */
  ::-moz-range-thumb {
    height: 11px;
    width: 11px;
    border-radius: 50%;
    border: transparent;
    background-color: var(--knobby);
    cursor: pointer;
    position: relative;
    z-index: 3;
    box-sizing: border-box;
  }

  /* knobby while dragging - firefox */
  :active::-moz-range-thumb {
    transform: scale(1.2);
    background: var(--selectedKnobby);
  }
`;

export const Time = styled.span`
  position: absolute;
  bottom: -1.8rem;
  left: 0;
  font-size: 1.1rem;
`;

export const SpeedButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 3.2rem;
  height: 3.2rem;

  color: #fff;
  font-size: 1.2rem;
  background-color: #111 !important;
  border: none;
  outline: none;
  border-radius: 50%;
  margin-left: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  :hover {
    background-color: #070707 !important;
  }
`;
