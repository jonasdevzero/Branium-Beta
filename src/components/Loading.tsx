import Image from "next/image"

import {
    Container,
    Title,
} from "../styles/components/Loading"

export default function Loading({ hide }: { hide: boolean }) {
    return (
        <Container hide={hide}>
            <Title>Branium</Title>

            <Image src="/images/loading-light.svg" alt="loading" width="45" height="45" />
        </Container>
    )
}
