import styled from "styled-components"

export const Container = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    height: 6rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0 1.5rem;

    background-color: #121212;

    svg {
        color: #ddd;
        cursor: pointer;
        font-size: 2.5rem;
    };
`
export const Inner = styled.div`
    display: flex;
    width: 100%;
    position: relative;
`

export const Input = styled.input`
    width: 100%;
    height: 4rem;

    outline: none;
    border: none;
    border-radius: 0;

    font-size: 1.6rem;
    color: #fff;
    background-color: #202020;
    margin: 0 1rem;
    padding: 0 5rem 0 1.5rem;
    border-radius: 10rem;
`

export const MediaInput = styled.input`
    display: none;
`

export const Submit = styled.button`
    width: 4rem;
    height: 4rem;

    outline: none;
    border: none;
    border-radius: 0;

    cursor: pointer;
    background-color: transparent;

    position: absolute;
    top: 57%;
    right: 2rem;
    transform: translateY(-50%);
`

export const Icon = styled.label`
    display: flex;
    align-items: center;
    width: 3.5rem;
    height: 3.5rem;

    background-color: transparent;

    & + & {
        margin-left: 1.5rem;
    };
`

export const EmojiPickerContainer = styled.div`
    position: absolute;
    bottom: 6rem;
    left: 1rem;
`
