import Head from "next/head"
import Link from "next/link"
import { authPage } from "../../hooks"
import { constants } from "../../constants"

import { Sidebar } from "../../components"

import {
    Container,
    Center,
    Title,
    Text
} from "../../styles/pages/app"

export default function App() {
    return (
        <Container>
            <Head>
                <title>Branium</title>
            </Head>

            <Sidebar />

            <Center>
                <Title>Branium</Title>

                <Text>
                    Tá de bobeira? <Link href={constants.routes.chat.GAMES}>Que tal um jogo?</Link>
                </Text>
            </Center>
        </Container>
    )
}

export const getServerSideProps = authPage
