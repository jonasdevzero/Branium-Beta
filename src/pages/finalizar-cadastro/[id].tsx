import { useState } from "react"
import Head from "next/head"
import Router from "next/router"
import Image from "next/image"
import { AxiosError } from "axios"
import userService from "~/services/api/userService"
import { constant } from "~/constant"

import { Header, Footer, Loading } from "~/components"
import {
  Container,
  Content,
  FitForm,
  Title,
  ErrorMessage,
  InputWrapper,
  Label,
  Input,
  Submit
} from "~/styles/utils/FormPage"
import { NextPageContext } from "next"

type FinishSubscribeProps = {
  error?: AxiosError
}

export default function FinalizarCadastro({ }: FinishSubscribeProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [loadingRequest, setLoadingRequest] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string>()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const id = Router.query.id!.toString()

    setError(undefined)
    setLoadingRequest(true)
    userService.registration(id, { username, password, confirm_password: confirmPassword })
      .then(() => {
        setSuccess(true)
        Router.replace(constant.routes.chat.HOME)
      })
      .catch(error => setError(error))
      .then(() => setLoadingRequest(false))
  }

  return (
    <Container>
      <Head>
        <title>Branium | Finalizar Cadastro</title>
      </Head>

      {success ? (<Loading hide={false} />) : (
        <>
          <Header links={false} />

          <Content alignCenter>
            <FitForm onSubmit={handleSubmit}>
              <Title>Finalizar</Title>

              {error ? (<ErrorMessage>{error}</ErrorMessage>) : null}

              <InputWrapper>
                <Label htmlFor="username">Username</Label>
                <Input required id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
              </InputWrapper>

              <InputWrapper>
                <Label htmlFor="password">Senha</Label>
                <Input required id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </InputWrapper>

              <InputWrapper>
                <Label htmlFor="confirm_password">Confirmar Senha</Label>
                <Input required id="confirm_password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </InputWrapper>

              <Submit type="submit">
                {!loadingRequest ? "Cadastrar" : (<Image src="/images/loading-light.svg" alt="loading" width={30} height={30} />)}
              </Submit>
            </FitForm>
          </Content>

          <Footer />
        </>
      )}

    </Container>
  )
}


export async function getServerSideProps(ctx: NextPageContext) {
  try {
    const id = ctx.query.id as string;

    const { pending } = await userService.getPreRegistration(id);

    return !pending ? {
      redirect: {
        destination: constant.routes.SIGN_IN,
        permanent: false
      }
    } : {
      props: {}
    }
  } catch (error: any) {
    return error.response?.status === 404 ? {
      redirect: {
        destination: constant.routes.HOME,
        permanent: false
      }
    } : {
      props: {
        error: "Houve um problema no servidor! Volte mais tarde!"
      }
    }
  }
}
