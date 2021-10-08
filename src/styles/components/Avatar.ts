import styled from "styled-components"

type AvatarWrapperProps = {
    size?: string
}

export const AvatarWrapper = styled.div<AvatarWrapperProps>`
    width: ${({ size }) => size ? size : "5.5rem"};
    height: ${({ size }) => size ? size : "5.5rem"};
    border-radius: 50%;
    background-color: lightgray;
    transition: width .3s ease, height .3s ease;

    div {
        position: unset !important;
        border-radius: 50%;
    }

    .image {
        object-fit: contain;
        width: 100% !important;
        position: relative !important;
        height: unset !important;
    }
`
