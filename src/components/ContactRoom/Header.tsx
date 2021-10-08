import { Contact } from "../../types/user"

import { Avatar } from "../"

import {
    Container,
    Room
} from "../../styles/components/Room/Header"

type HeaderProps = {
    contact: Contact
    toggleInfo:() => void
}

export default function Header({ contact, toggleInfo }: HeaderProps) {

    return (
        <Container>
            <Room onClick={() => toggleInfo()}>
                <Avatar />
                <h2>{contact.username}</h2>
            </Room>
        </Container>
    )
}
