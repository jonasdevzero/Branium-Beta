import Head from "next/head"

import {
  Container
} from "../styles/pages/home"

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Branium</title>
      </Head>

      <h1>Branium</h1>
      <h2>O Chat Brasileiro</h2>
    </Container>
  )
}
