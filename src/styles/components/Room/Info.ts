import styled from "styled-components"

type ContainerProps = {
    show: boolean
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    width: ${({ show })  => show ? "65rem" : "0px"};
    background-color: #131313;
    padding: ${({ show })  => show ? "4rem 1rem" : "0"};
    transition: width .3s ease, opacity .5s ease;
    overflow: hidden;
    opacity: ${({ show }) => show ? 1 : 0};
`

export const Close = styled.button`
    background-color: transparent;
    color: #fff;
    font-size: 2.5rem;
    border: none;
    cursor: pointer;

    position: absolute;
    top: 2.5rem;
    right: 2.5rem;
`

export const Username = styled.span`
    font-size: 2.5rem;
    margin-top: 2rem;
`

export const Options = styled.div`
    margin-top: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const Option = styled.button`
    font-size: 1.6rem;
    background-color: #101010;
    padding: 1.2rem 1rem;
    margin: 0 1rem;
    color: #fff;
    border: none;
    cursor: pointer;

    & + & {
        margin-top: 1rem;
    }
`
