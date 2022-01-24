import { useContext } from "react";
import { CallContext } from "~/contexts/CallContext";
import { Group } from "~/types/user";

import { Avatar } from "../../"

import {
  Container,
  Room,
  Icon,
} from "~/styles/components/Room/Header"
import { FiMoreVertical, FiPhone, FiVideo } from "react-icons/fi";

interface HeaderI {
  group: Group
}

export default function Header({ group }: HeaderI) {
  const { callTo } = useContext(CallContext)

  return (
    <Container>
      <Room onClick={() => {}}>
        <Avatar src={group.picture} />
        <h2>{group.name}</h2>
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