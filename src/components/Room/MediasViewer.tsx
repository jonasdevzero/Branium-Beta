import { ContactMediaMessage } from "../../types/user"

import {
    Container,
    Close,
    ImageContainer,
} from "../../styles/components/MediasViewer"
import { FiX } from "react-icons/fi"

interface MediasViewerI {
    medias: ContactMediaMessage[]
    initialIndex: number
    close(): void
}
export default function MediaViewer({ medias, initialIndex, close }: MediasViewerI) {

    return (
        <Container>
            <Close onClick={() => close()}>
                <FiX />
            </Close>

            {/* Add slide in the future */}
            <ImageContainer>
                <img src={medias[initialIndex].url} alt="" />
            </ImageContainer>
        </Container>
    )
}
