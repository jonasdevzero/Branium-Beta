import styled from "styled-components"


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

interface ContentI {
    alignCenter?: boolean
}

export const Content = styled.div<ContentI>`
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.alignCenter ? "center" : "flex-end"};
    width: 100%;
    height: 100vh;

    padding: 0 10rem;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 32rem;
    min-height: 43rem;
    position: relative;

    background-color: #252525;
    padding: 3.5rem 2.5rem;
    border-radius: .4rem;
`

export const FitForm = styled(Form)`
    min-height: fit-content;
`

export const Title = styled.h1`
    font-size: 3.5rem;
    font-family: 'Red Hat Text', sans-serif;
    font-weight: 400;
    margin-bottom: 3rem;
`

export const ErrorMessage = styled.strong`
    width: 100%;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 1.5rem;
    border-radius: .4rem;
    padding: .7rem;

    background-color: red;
    font-size: 1.5rem;
    font-family: 'Red Hat Text', sans-serif;
    font-weight: 500;
    text-align: center;
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    & + & {
        margin-top: 1rem;
    };
`

export const Label = styled.label`
    font-size: 1.4rem;
    font-family: 'Red Hat Text', sans-serif;
    color: lightgray;
    margin-bottom: .5rem;
`

export const Input = styled.input`
    width: 100%;
    height: 4.5rem;

    border: none;
    outline: none;
    background-color: #404040;
    padding: 0 .5rem;
    color: #fff;
    border-radius: .4rem;
`

export const Submit = styled.button`
    width: 100%;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #2e2e2e;
    margin-top: .7rem;
    margin-bottom: 3rem;
    border: none;
    outline: none;
    border-radius: .4rem;
    color: #fff;
    font-size: 1.4rem;
    cursor: pointer;
    transition: background-color .2s ease;

    ${InputWrapper} + & {
        margin-top: 2rem;
    };

    img {
        width: 3.5rem;
        height: 3.5rem;
    };

    &:hover {
        background-color: #2c2c2c;
    }
`

export const Links = styled.div`
    margin-top: auto;
`

export const RedirectLink = styled.a`
    font-size: 1.2rem;
    font-family: 'Red Hat Text', sans-serif;
    text-decoration: underline;
    color: lightgray;
    cursor: pointer;

    & + & {
        margin-left: 1rem;
    };
`
