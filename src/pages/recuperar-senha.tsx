import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import userService from "../services/api/userService"
import { useWarn } from "../hooks"
import { constants } from "../constants"

import { Header, Footer } from "../components"
import {
    Container,
    Content,
    FitForm,
    Title,
    ErrorMessage,
    InputWrapper,
    Label,
    Input,
    Submit,
    Links,
    RedirectLink
} from "../styles/utils/FormPage"

export default function FinalizarCadastro() {
    const [email, setEmail] = useState("")

    const [error, setError] = useState<string>()
    const [loadingRequest, setLoadingRequest] = useState(false)

    const warn = useWarn()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setError(undefined)
        setLoadingRequest(true)
        userService.forgotPassword(email)
            .then(message => warn.show(message))
            .catch(message => setError(message))
            .then(() => setLoadingRequest(false))
            .then(() => setEmail(""))
    }

    return (
        <Container>
            <Head>
                <title>Branium | Recuperar Senha</title>
            </Head>
            
            <Header links={false} />

            <Content alignCenter>
                <FitForm onSubmit={handleSubmit}>
                    <Title>Recuperar Senha</Title>
                    
                    {error ? (<ErrorMessage>{error}</ErrorMessage>) : null}

                    <InputWrapper>
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </InputWrapper>

                    <Submit type="submit">
                        {!loadingRequest ? "Enviar" : (<Image src="/images/loading-light.svg" width={30} height={30} alt="loading" />)}
                    </Submit>

                    <Links>
                        <Link href={constants.routes.SIGN_IN} passHref>
                            <RedirectLink>Lembrou a senha?</RedirectLink>
                        </Link>
                    </Links>
                </FitForm>
            </Content>

            <Footer />
        </Container>
    )
}
