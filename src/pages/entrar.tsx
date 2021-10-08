import { useState, useEffect } from "react"
import { NextPageContext } from "next"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import Router from "next/router"
import { parseCookies } from "nookies"
import userService from "../services/api/userService"
import { constants } from "../constants"


import { Header, Footer, Loading } from "../components"
import {
    Container,
    Content,
    Form,
    Title,
    ErrorMessage,
    InputWrapper,
    Label,
    Input,
    Submit,
    Links,
    RedirectLink
} from "../styles/utils/FormPage"

export default function Entrar() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [loadingRequest, setLoadingRequest] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string>()

    useEffect(() => {
        Router.query?.error ? setError(Router.query.error.toString()) : null
        return () => { }
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setError(undefined)
        setLoadingRequest(true)
        userService.login({ username, password })
            .catch(message => setError(message))
            .then(() => {
                setSuccess(true)
                setLoadingRequest(false)
                Router.push(constants.routes.chat.HOME)
            })
    }

    return (
        <Container>
            <Head>
                <title>Branium | Entrar</title>
            </Head>

            {success ? (<Loading hide={false} />) : (
                <>
                    <Header links={false} />

                    <Content>
                        <Form onSubmit={handleSubmit}>
                            <Title>Entrar</Title>

                            {error && <ErrorMessage>{error}</ErrorMessage>}

                            <InputWrapper>
                                <Label htmlFor="username">Username / E-mail</Label>
                                <Input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                            </InputWrapper>

                            <InputWrapper>
                                <Label htmlFor="password">Senha</Label>
                                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </InputWrapper>

                            <Submit type="submit">
                                {!loadingRequest ? "Entrar" : (<Image src="/images/loading-light.svg" width={30} height={30} alt="loading" />)}
                            </Submit>

                            <Links>
                                <Link href={constants.routes.SIGN_UP} passHref>
                                    <RedirectLink>Não é um membro?</RedirectLink>
                                </Link>

                                <Link href={constants.routes.RECOVER_PASSWORD} passHref>
                                    <RedirectLink>Esqueceu a Senha?</RedirectLink>
                                </Link>
                            </Links>
                        </Form>
                    </Content>

                    <Footer />
                </>)}
        </Container>
    )
}

export async function getServerSideProps(ctx: NextPageContext) {
    const { ["branium.jwt"]: jwt } = parseCookies(ctx)

    if (jwt) {
        return {
            redirect: {
                destination: constants.routes.chat.HOME,
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}