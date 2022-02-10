import { useContext } from "react";
import { useAppDispatch } from "~/hooks";
import { CallContext } from "~/contexts/CallContext";
import SettingsActions from "~/store/actions/SettingsActions";
import { Group } from "~/types/user";

import { Avatar } from "../../"

import {
  Container,
  Room,
  Icon,
} from "~/styles/components/Room/Header"
import {
  FiMoreVertical,
  FiPhone,
  FiVideo,
  FiUsers,
} from "react-icons/fi";

interface HeaderI {
  group: Group
}

export default function Header({ group }: HeaderI) {
  const { callTo } = useContext(CallContext)

  const dispatch = useAppDispatch();

  return (
    <Container>
      <Room onClick={() => { }}>
        <Avatar src={group.picture} />
        <h2>{group.name}</h2>
      </Room>

      <Icon onClick={() => callTo()}>
        <FiPhone />
      </Icon>

      <Icon onClick={() => callTo()}>
        <FiVideo />
      </Icon>

      <Icon onClick={() => dispatch(SettingsActions.room.toggleShowMembers())}>
        <FiUsers />
      </Icon>

      <Icon onClick={() => {}}>
        <FiMoreVertical />
      </Icon>
    </Container>
  )
}