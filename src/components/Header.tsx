import Link from "next/link"
import {
  Container,
  Logo,
  StyledLink
} from "../styles/components/Header"

export default function Header({ links }: { links: boolean }) {
  return (
    <Container>
      <Link href="/" passHref>
        <Logo aria-label="Página principal">Branium</Logo>
      </Link>

      {links ? (
        <nav>
          <Link href="/entrar" passHref>
            <StyledLink>Entrar</StyledLink>
          </Link>

          <Link href="/cadastrar" passHref>
            <StyledLink className="signup">Cadastrar</StyledLink>
          </Link>
        </nav>
      ) : null}
    </Container>
  )
}
