import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import userService from "../services/api/userService"
import { AxiosError } from "axios"
import { useWarn } from "../hooks"
import { constant } from "../constant"

import { Header, Footer, BraniumAnimation } from "../components"
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

export default function Cadastrar() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [loadingRequest, setLoadingRequest] = useState(false)
  const [error, setError] = useState(undefined)
  const [newRegistration, setNewRegistration] = useState(false)
  const warn = useWarn()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setError(undefined)
    setLoadingRequest(true)
    userService.preRegistration({ name, email })
      .then(handleSuccess)
      .catch((error: AxiosError) => setError(error.response?.data.message))
      .then(() => setLoadingRequest(false))
  }

  function handleSuccess(message: string) {
    setName("")
    setEmail("")
    warn.success(message)
    setNewRegistration(true)
  }

  return (
    <Container>
      <Head>
        <title>Branium | Cadastrar</title>
      </Head>

      <Header links={false} />

      <Content>
        <Form onSubmit={handleSubmit}>
          <Title>Cadastrar</Title>

          {error && (<ErrorMessage>{error}</ErrorMessage>)}

          <InputWrapper>
            <Label htmlFor='name'>Nome</Label>
            <Input required id='name' type='text' value={name} onChange={e => setName(e.target.value)} />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor='email'>E-mail</Label>
            <Input required id='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
          </InputWrapper>

          <Submit type='submit'>
            {!loadingRequest ? 'Cadastrar' : (<Image src="/images/loading-light.svg" alt="loading" width={30} height={30} />)}
          </Submit>

          <Links>
            <Link href={constant.routes.SIGN_IN} passHref>
              <RedirectLink>Já é um membro?</RedirectLink>
            </Link>

            {newRegistration ? (
              <Link href={constant.routes.FAQ} passHref>
                <RedirectLink>Não recebeu o email?</RedirectLink>
              </Link>
            ) : null}
          </Links>
        </Form>
      </Content>

      <Footer />

      <BraniumAnimation />
    </Container>
  )
}
