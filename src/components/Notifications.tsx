
import {
    Overlay,
    Container,
    Close
} from "../styles/components/Notifications"
import { FiX } from "react-icons/fi"

export default function Notifications({ close }: { close: () => void }) {

    return (
        <>
            <Overlay onClick={() => close()} />

            <Container>
                <h1>Notificações</h1>
                <br />
                <h1>Em Desenvolvimento :)</h1>

                <Close type="button" onClick={() => close()}>
                    <FiX />
                </Close>
            </Container>
        </>
    )
}