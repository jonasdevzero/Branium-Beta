import styled from "styled-components"

export const Container = styled.section`
    display: flex;
    align-items: center;
    width: 100%;
    height: 7rem;

    padding: 0 3rem;
    background-color: #121212;

    h2 {
        font-size: 1.8rem;
        font-weight: 500;
        margin-left: 1rem;
    };
`

export const Room = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-right: 20%;

    cursor: pointer;

    h2 {
        font-size: 1.8rem;
        font-weight: 500;
        margin-left: 1rem;
    }
`

export const Icon = styled.span`
    font-size: 2.2rem;
    cursor: pointer;

    & + & {
        margin-left: 3rem;
    }
`
