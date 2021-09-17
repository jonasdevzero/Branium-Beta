import styled from "styled-components";

interface ItemI {
    position: number;
    loadbar: boolean;
    fadeout: boolean;
    loadbarColor: string;
}

export const Item = styled.div<ItemI>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 25rem;
    height: 12rem;
    padding: 1rem;

    background-color: #222;
    padding: 1.2rem;
    border-radius: .3rem;
    transition: top .5s ease, opacity .2s ease;
    overflow: hidden;
    z-index: 1000;

    position: absolute;
    top: ${({ position }) => position === 1 ? '2rem' : `${position * 13 - 13}rem`};
    right: 5rem;
    opacity: ${({ fadeout }) => fadeout ? 0 : 1};


    &::after {
        content: "";
        position: absolute;
        top: -.35rem;
        right: ${({ loadbar }) => loadbar ? "0rem" : "25rem"};
        transition: right 1.5s ease;

        width: 25rem;
        height: 12rem;
        border-bottom: solid .35rem ${({ loadbarColor }) => loadbarColor};
    };

    & + & {
        margin-top: 1.5rem;
    }

    @keyframes item {
        0% {
            opacity: .5;
        }
        100% {
            opacity: 1;
        }
    }
    animation-name: item;
    animation-duration: .4s;
`;

export const Message = styled.p`
    font-size: 1.7rem;
    font-weight: 400;
    text-align: center;
    color: #ddd;
    line-height: 2.3rem;
`;
