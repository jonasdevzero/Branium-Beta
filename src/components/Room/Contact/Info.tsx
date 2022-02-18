import { useRef, useState } from "react"
import { contactService } from "~/services/api"
import { useOutsideClick, useWarn } from "~/hooks"
import { Contact } from "~/types/user"

import { Avatar } from "~/components"

import {
  Container,
  Close,
  Username,
  DropdownList,
  DropdownButton,
  Dropdown,
  DropdownItem,
} from "~/styles/components/Room/Info"
import {
  FiX,
  FiMoreVertical,
} from "react-icons/fi"

type InfoProps = {
  contact: Contact
  close: () => void
}

export default function Info({ contact, close }: InfoProps) {
  const actionsRef = useRef(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const warn = useWarn()

  async function block() {
    await contactService.block(contact.id)
    warn.info(`${contact.username} foi ${contact.you_blocked ? "" : "des"}bloqueado!`)
  }

  useOutsideClick(actionsRef, () => setShowDropdown(false))

  return (
    <>
      <div className="overlay" onClick={close} />

      <Container>
          <Close onClick={close}>
            <FiX />
          </Close>

          <Avatar src={contact.picture} size="15rem" />
          <Username>{contact.username}</Username>

          <Dropdown>
            <DropdownButton onClick={() => setShowDropdown(!showDropdown)}>
              <FiMoreVertical />
            </DropdownButton>

            {showDropdown ? (
              <DropdownList ref={actionsRef}>
                <DropdownItem className={!contact.you_blocked ? "danger" : ""} onClick={block}>
                  {contact.you_blocked ? "Desbloquear" : "Bloquear"}
                </DropdownItem>
              </DropdownList>
            ) : null}
          </Dropdown>
      </Container>
    </>
  )
}
