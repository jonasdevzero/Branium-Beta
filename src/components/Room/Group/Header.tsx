import { useContext, useRef, useState } from "react";
import { useAppDispatch, useOutsideClick } from "~/hooks";
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
  Dropdown,
  DropdownItem,
} from "~/styles/components/Dropdown"
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
  const { callTo } = useContext(CallContext);

  const dropdownRef = useRef(null)
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useAppDispatch();

  useOutsideClick(dropdownRef, () => setShowDropdown(false))

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

      <Icon ref={dropdownRef} onClick={() => setShowDropdown(!showDropdown)}>
        <FiMoreVertical />

        {showDropdown ? (
          <Dropdown>
            <DropdownItem>Dados do grupo</DropdownItem>
            <DropdownItem>Sair do grupo</DropdownItem>
          </Dropdown>
        ) : null}
      </Icon>
    </Container>
  )
}