import styled from "styled-components"

type LoadingProps = {
    hide: boolean
}

export const Container = styled.div<LoadingProps>`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: opacity .2s ease;
    background-color: #090909;

    opacity: ${({ hide }) => hide ? 0 : 1};
`

export const Title = styled.h1`
    font-size: 5.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
`
