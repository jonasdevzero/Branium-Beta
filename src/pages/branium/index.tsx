import Head from "next/head"
import Link from "next/link"
import { authPage } from "~/hooks"
import { constant } from "~/constant"

import { Sidebar } from "~/components"

import {
  Container,
  Center,
  Title,
  Text
} from "~/styles/pages/branium"

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
          Tá de bobeira? <Link href={constant.routes.chat.GAMES}>Que tal um jogo?</Link>
        </Text>
      </Center>
    </Container>
  )
}
