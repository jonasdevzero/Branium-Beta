import { Contact } from "../../types/user"

import { Avatar } from "../"

import {
    Container,
    Room
} from "../../styles/components/Room/Header"

export default function Header({ contact }: { contact: Contact }) {

    return (
        <Container>
            <Room>
                <Avatar />
                <h2>{contact.username}</h2>
            </Room>
        </Container>
    )
}
