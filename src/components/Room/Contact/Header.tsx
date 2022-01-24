import { useContext } from "react"
import { Contact } from "~/types/user"
import { CallContext } from "~/contexts/CallContext"

import { Avatar } from "../../"

import {
  Container,
  Room,
  Icon,
} from "~/styles/components/Room/Header"
import {
  FiPhone,
  FiVideo,
  FiMoreVertical
} from "react-icons/fi"

type HeaderProps = {
  contact: Contact
  toggleInfo: () => void
}

export default function Header({ contact, toggleInfo }: HeaderProps) {
  const { callTo } = useContext(CallContext)

  return (
    <Container>
      <Room onClick={() => toggleInfo()}>
        <Avatar src={contact.picture} />
        <h2>{contact.username}</h2>
      </Room>

      <Icon onClick={() => callTo()}>
        <FiPhone />
      </Icon>
      <Icon onClick={() => callTo()}>
        <FiVideo />
      </Icon>
      <Icon onClick={() => { }}>
        <FiMoreVertical />
      </Icon>
    </Container>
  )
}
