import Head from "next/head"

import { Sidebar } from "~/components"

import {
  Container,
  Center,
  Title,
} from "~/styles/pages/app"

export default function Games() {

  return (
    <Container>
      <Head>
        <title></title>
      </Head>

      <Sidebar />

      <Center>
        <Title>Em Desenvolvimento :)</Title>
      </Center>
    </Container>
  )
}
