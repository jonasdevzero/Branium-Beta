import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { authPage, useAuth, useAppSelector } from "../../../hooks"
import { constants } from "../../../constants"

import { Sidebar } from "../../../components"
import { Header, Messages, Form, Info } from "../../../components/ContactRoom"
import { Container, Inner } from "../../../styles/pages/app"

export default function Contact() {
    const router = useRouter()
    const contact = useAppSelector(state => state.user.contacts.find(c => c.id === router.query.id))
    const [showInfo, setShowInfo] = useState(false)

    const { isAuthenticated } = useAuth()

    useEffect(() => {
        isAuthenticated && !contact ? router.replace(constants.routes.chat.HOME) : null
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

                    <Info contact={contact} show={showInfo} close={() => setShowInfo(false)} />
                </>
            ) : null}
        </Container>
    )
}

export const getServerSideProps = authPage
