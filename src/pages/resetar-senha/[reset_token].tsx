import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import Image from "next/image"
import useWarn from "~/hooks/useWarn"
import userService from "~/services/api/userService"
import { constant } from "~/constant"

import { Header, Footer } from "~/components"
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

export default function FinalizarCadastro() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [error, setError] = useState<string>()
  const [loadingRequest, setLoadingRequest] = useState(false)

  const router = useRouter()
  const warn = useWarn()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { reset_token } = router.query

    setError(undefined)
    setLoadingRequest(true)
    userService.resetPassword({ reset_token, password, confirm_password: confirmPassword })
      .then(message => {
        warn.show(message)
        setTimeout(() => { router.push(constant.routes.SIGN_IN) }, 2500)
      })
      .catch(message => setError(message))
      .then(() => setLoadingRequest(false))
  }

  return (
    <Container>
      <Head>
        <title>Branium | Resetar Senha</title>
      </Head>

      <Header links={false} />

      <Content alignCenter>
        <FitForm onSubmit={handleSubmit}>
          <Title>Resetar Senha</Title>

          {error ? (<ErrorMessage>{error}</ErrorMessage>) : null}

          <InputWrapper>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="confirm_password">Confirmar Senha</Label>
            <Input id="confirm_password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </InputWrapper>

          <Submit type="submit">
            {!loadingRequest ? "Resetar" : (<Image src="/images/loading-light.svg" width={30} height={30} alt="loading" />)}
          </Submit>
        </FitForm>
      </Content>

      <Footer />
    </Container>
  )
}
