import Head from "next/head"

import { Sidebar } from "~/components"
import { Container, Inner } from "~/styles/pages/branium"

export default function Editar() {
  return (
    <Container>
      <Head>
        <title>Branium | Editar Grupo</title>
      </Head>

      <Sidebar />

      <Inner>
        Editar grupo
      </Inner>
    </Container>
  )
}