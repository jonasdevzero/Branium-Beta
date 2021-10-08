import { contactService } from "../../services/api"
import { useWarn } from "../../hooks"
import { Contact } from "../../types/user"

import { Avatar } from "../"

import {
    Container,
    Close,
    Username,
    Options,
    Option
} from "../../styles/components/Room/Info"
import { FiX } from "react-icons/fi"

type InfoProps = {
    contact: Contact
    show: boolean
    close: () => void
}

export default function Info({ contact, show, close }: InfoProps) {
    const warn = useWarn()

    async function block() {
        await contactService.block(contact.id)
        warn.info(`${contact.username} foi ${contact.you_blocked ? "" : "des"}bloqueado!`)
    }

    return (
        <Container show={show}>
            {show ? (
                <>
                    <Close type="button" onClick={() => close()}>
                        <FiX />
                    </Close>

                    <Avatar src={contact.picture} size="20rem" />
                    <Username>{contact.username}</Username>

                    <Options>
                        <Option onClick={() => { }}>Deletar mensagens</Option>
                        <Option onClick={() => block()}>{contact.you_blocked ? "Remover bloqueio" : "Bloquear"}</Option>
                    </Options>
                </>
            ) : null}
        </Container>
    )
}
