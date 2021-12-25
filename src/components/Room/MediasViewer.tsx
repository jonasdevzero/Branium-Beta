import { useState } from "react"
import Image from "next/image"
import { ContactMediaMessage } from "../../types/user"

import {
    Container,
    Close,
    Button,
    ImageContainer,
} from "../../styles/components/Room/MediasViewer"
import { 
    FiX,
    FiChevronLeft,
    FiChevronRight
} from "react-icons/fi"

interface MediasViewerI {
    medias: ContactMediaMessage[]
    initialIndex: number
    close(): void
}
export default function MediaViewer({ medias, initialIndex, close }: MediasViewerI) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)

    const prev = () => currentIndex === 0 ? setCurrentIndex(medias.length - 1) : setCurrentIndex(currentIndex - 1)
    const next = () => (currentIndex + 1) > (medias.length - 1) ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1)

    return (
        <Container>
            <Close onClick={close}>
                <FiX />
            </Close>

            <Button className="prev" onClick={prev}>
                <FiChevronLeft />
            </Button>
            
            <ImageContainer>
                <Image src={medias[currentIndex].url} alt="" layout="fill" />
            </ImageContainer>

            <Button className="next" onClick={next}>
                <FiChevronRight />
            </Button>
        </Container>
    )
}
