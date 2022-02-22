import { useEffect, useMemo, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useAuth, useAppSelector } from "~/hooks"
import { constant } from "~/constant"

import { Sidebar } from "~/components"
import { Header, Messages, Form, Members, Info } from "~/components/Room/Group"
import { Container, Inner } from "~/styles/pages/branium"

export default function Contact() {
  const router = useRouter()
  const groups = useAppSelector(state => state.user.groups)
  const group = useMemo(() => groups.find(c => c.id === router.query.id), [router, groups])

  const showMembers = useAppSelector(state => state.settings.room.showMembers);
  const [showInfo, setShowInfo] = useState(false)

  const { isAuthenticated } = useAuth()

  useEffect(() => {
    isAuthenticated && !group ? router.replace(constant.routes.chat.HOME) : null
  }, [group, router, isAuthenticated])

  return (
    <Container>
      <Head>
        <title>Branium | {group?.name}</title>
      </Head>

      <Sidebar />

      {group ? (
        <>
          <Inner>
            <Header group={group} toggleInfo={() => setShowInfo(!showInfo)} />
            <Messages group={group} />
            <Form group_id={group.id} />
          </Inner>

          {showMembers ? (<Members group={group} />) : null}
          {showInfo ? (<Info group={group} close={() => setShowInfo(false)} />) : null}
        </>
      ) : null}
    </Container>
  )
}
