import Link from "next/link"

import {
  Container,
  Card,
  Content,
  Item,
  StyledLink
} from "../styles/components/Footer"
import { FiHeart } from "react-icons/fi"

export default function Footer() {
  return (
    <Container>
      <Card>
        <h4>Brasil Colloquium</h4>
        <span>Desenvolvido com <FiHeart /> por jonasdevzero</span>
      </Card>

      <hr />

      <Content>
        <Item>
          <h5>Explore</h5>

          <Link href="/" passHref>
            <StyledLink>Início</StyledLink>
          </Link>

          <Link href="/entrar" passHref>
            <StyledLink>Entrar</StyledLink>
          </Link>

          <Link href="/cadastrar" passHref>
            <StyledLink>Cadastrar</StyledLink>
          </Link>

          <Link href="/faq" passHref>
            <StyledLink>FAQ</StyledLink>
          </Link>
        </Item>

        <Item>
          <h5>Social</h5>

          <StyledLink href="https://github.com/jonasdevzero" rel="noopener noreferrer external nofollow" target="_blank">
            GitHub
          </StyledLink>

          <StyledLink href="https://www.linkedin.com/in/jonasdevzero/" rel="noopener noreferrer external nofollow" target="_blank">
            LinkedIn
          </StyledLink>

          <StyledLink href="mailto:jonasdevzero@gmail.com" rel="noopener noreferrer external nofollow" target="_blank">
            E-mail
          </StyledLink>
        </Item>

        <Item>
          <h5>Legal</h5>

          <Link href="/termos" passHref>
            <StyledLink>Termos</StyledLink>
          </Link>

          <Link href="/privacidade" passHref>
            <StyledLink>Privacidade</StyledLink>
          </Link>
        </Item>
      </Content>
    </Container>
  )
}
