import { useState } from "react"
import { contactService } from "../../../services/api"
import { useWarn } from "../../../hooks"
import { Contact } from "../../../types/user"

import { Avatar } from "../.."

import {
    Overlay,
    Container,
    Close,
    User,
    Username,
    DropdownList,
    DropdownButton,
    Dropdown,
    DropdownItem,
    Inner,
    Header,
    Option,
    OptionSelected,
    Content,
} from "../../../styles/components/Room/Info"
import {
    FiX,
    FiMoreVertical,
} from "react-icons/fi"

type InfoProps = {
    contact: Contact
    close: () => void
}

export default function Info({ contact, close }: InfoProps) {
    const [showDropdown, setShowDropdown] = useState(false)
    const [option, setOption] = useState<"friends" | "groups">("friends")

    const warn = useWarn()

    async function block() {
        await contactService.block(contact.id)
        warn.info(`${contact.username} foi ${contact.you_blocked ? "" : "des"}bloqueado!`)
    }

    return (
        <>
            <Overlay onClick={() => close()} />

            <Container>
                <User>
                    <Close onClick={() => close()}>
                        <FiX />
                    </Close>

                    <Avatar src={contact.picture} size="15rem" />
                    <Username>{contact.username}</Username>

                    <Dropdown>
                        <DropdownButton onClick={() => setShowDropdown(!showDropdown)}>
                            <FiMoreVertical />
                        </DropdownButton>

                        {showDropdown ? (
                            <DropdownList>
                                <DropdownItem onClick={() => close()}>
                                    Mensagem
                                </DropdownItem>

                                <DropdownItem className={!contact.you_blocked ? "danger" : ""} onClick={() => block()}>
                                    {contact.you_blocked ? "Desbloquear" : "Bloquear"}
                                </DropdownItem>
                            </DropdownList>
                        ) : null}
                    </Dropdown>
                </User>

                <Inner>
                    <Header>
                        <Option onClick={() => setOption("friends")}>
                            Amigos em comum
                            <OptionSelected selected={option === "friends"} />
                        </Option>

                        <Option onClick={() => setOption("groups")}>
                            Grupos em comum
                            <OptionSelected selected={option === "groups"} />
                        </Option>
                    </Header>

                    <Content>
                        <h2>Em Desenvolvimento :)</h2>
                    </Content>
                </Inner>
            </Container>
        </>
    )
}
