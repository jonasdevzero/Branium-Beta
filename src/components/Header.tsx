import Link from "next/link"
import {
	Container,
	Logo,
	StyledLink
} from "../styles/components/Header"

export default function Header({ links }: { links: boolean }) {
	return (
		<Container>
			<Logo>Branium</Logo>

			{links ? (
				<nav>
					<Link href="/entrar" passHref>
						<StyledLink>Entrar</StyledLink>
					</Link>
					
					<Link href="/cadastrar" passHref>
						<StyledLink>Cadastrar</StyledLink>
					</Link>
				</nav>
			) : null}
		</Container>
	)
}
