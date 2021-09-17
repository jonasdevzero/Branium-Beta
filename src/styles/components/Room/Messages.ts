import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: calc(100% - 12rem);

    display: flex;
    flex-direction: column;
    padding: 2rem 5rem;

    overflow-y: scroll;
`

export const LoadingMessages = styled.div`
    position: absolute;
    top: 8rem;
    left: 50%;
    padding: .5rem .5rem .3rem .5rem;
    background-color: #1e1e1e;
    border-radius: .3rem;

    transform: translateX(-50%);
`

export const Message = styled.div`
    width: 100%;
    padding: 0 3rem;
    margin-top: 1.5rem;
    position: relative;

    &.concat {
        margin-top: .3rem;
    };
`

export const Inner  = styled.div`
    width: fit-content;
    min-width: 9rem;
    max-width: 65%;
    position: relative;

    padding: .8rem .9rem;
    background-color: #222;

    border-radius: 0 1rem 1rem 1rem;

    &.sender {
        margin-right: 0;
        margin-left: auto;
        border-radius: 1rem 0 1rem 1rem;
    };
`

export const Text = styled.span`
    font-size: 1.5rem;
    width: max-content;
    margin-right: 6rem;
    line-height: 2rem;
    white-space: pre-wrap;
    flex-wrap: wrap;
`

export const User = styled.div`
    display: flex;
    position: absolute;
    position: absolute;
    left: -3rem;
    top: -2.5rem;
`

export const Username = styled.span`
    font-size: 1.4rem;
    margin-top: .5rem;
    margin-left: 1.5rem;
`

export const Date = styled.span`
    font-size: 1.6rem;

    margin: 1.5rem auto 0 auto;
    padding: 1rem 2rem;
    background-color: #222;
    border-radius: 1rem;
`

export const Time = styled.span`
    position: absolute;
    bottom: .5rem;
    right: 1rem;

    font-size: 1.1rem;
    color: lightgray;
`

export const ScrollToBottom = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.5rem;
    height: 4.5rem;
    position: absolute;
    bottom: 7rem;
    right: 1.4rem;
    
    background-color: #090909;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 50%;
    cursor: pointer;

    svg {
        font-size: 2rem;
    }
`

