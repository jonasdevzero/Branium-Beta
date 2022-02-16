import { useContext, useRef, useState } from "react"
import { useAppDispatch, useOutsideClick, useWarn } from "~/hooks"
import { Contact } from "~/types/user"
import { CallContext } from "~/contexts/CallContext"
import { contactService } from "~/services/api"
import UserActions from "~/store/actions/UserActions"

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
  FiPhone,
  FiVideo,
  FiMoreVertical
} from "react-icons/fi"

type HeaderProps = {
  contact: Contact
  toggleInfo: () => void
}

export default function Header({ contact, toggleInfo }: HeaderProps) {
  const { callTo } = useContext(CallContext);

  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  const warn = useWarn();
  const dispatch = useAppDispatch();

  function clearMessages() {
    contactService.messages.clear(contact.id)
      .then(() => {
        dispatch(UserActions.updateRoom({
          field: "contacts",
          where: { id: contact.id },
          set: { messages: [] }
        }));

        dispatch(UserActions.updateExtraRoomData({
          field: "contacts",
          where: { id: contact.id },
          set: {
            fetch_messages_count: 0,
            pushed_messages: 0,
            last_scroll_position: 0,
          }
        }));

        warn.success("Menssagens deletadas com sucesso!")
      })
      .catch(() => warn.error("Não foi possível deletar as menssagens!"));
  }

  function toggleBlock() {
    contactService.block(contact.id).then(() => {
      warn.info(`${contact.username} foi ${contact.you_blocked ? "" : "des"}bloqueado!`)
    })
  }

  return (
    <Container>
      <Room onClick={toggleInfo}>
        <Avatar src={contact.picture} />
        <h2>{contact.username}</h2>
      </Room>

      <Icon onClick={() => callTo()}>
        <FiPhone />
      </Icon>

      <Icon onClick={() => callTo()}>
        <FiVideo />
      </Icon>

      <Icon ref={dropdownRef} onClick={() => setShowDropdown(!showDropdown)}>
        <FiMoreVertical />

        {showDropdown ? (
          <Dropdown>
            <DropdownItem onClick={toggleInfo}>Dados do contato</DropdownItem>
            <DropdownItem onClick={clearMessages}>Limpar mensagens</DropdownItem>
            <DropdownItem className={!contact.you_blocked ? "danger" : ""} onClick={() => toggleBlock()}>
              {contact.you_blocked ? "Desbloquear" : "Bloquear"}
            </DropdownItem>
          </Dropdown>
        ) : null}
      </Icon>
    </Container>
  )
}
