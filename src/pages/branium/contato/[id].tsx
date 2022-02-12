import { useEffect, useState, useMemo } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { authPage, useAuth, useAppSelector } from "~/hooks"
import { constant } from "~/constant"

import { Sidebar } from "~/components"
import { Header, Messages, Form, Info } from "~/components/Room/Contact"
import { Container, Inner } from "~/styles/pages/branium"

export default function Contact() {
  const router = useRouter()
  const contacts = useAppSelector(state => state.user.contacts)
  const contact = useMemo(() => contacts.find(c => c.id === router.query.id), [router, contacts])

  const [showInfo, setShowInfo] = useState(false)

  const { isAuthenticated } = useAuth()

  useEffect(() => {
    isAuthenticated && !contact ? router.replace(constant.routes.chat.HOME) : null
  }, [contact, router, isAuthenticated])

  return (
    <Container>
      <Head>
        <title>Branium | {contact?.username}</title>
      </Head>

      <Sidebar />

      {contact ? (
        <>
          <Inner>
            <Header contact={contact} toggleInfo={() => setShowInfo(!showInfo)} />
            <Messages contact={contact} />
            <Form contact_id={contact.id} />
          </Inner>

          {showInfo && (<Info contact={contact} close={() => setShowInfo(false)} />)}
        </>
      ) : null}
    </Container>
  )
}
