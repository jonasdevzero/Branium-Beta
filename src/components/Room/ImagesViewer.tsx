import { useState } from "react"
import Image from "next/image"
import { ContactMediaMessage } from "~/types/user"

import {
  Container,
  Close,
  Button,
  ImageContainer,
} from "~/styles/components/Room/ImagesViewer"
import {
  FiX,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi"

interface ImagesViewerI {
  medias: ContactMediaMessage[]
  initialIndex: number
  close(): void
}
export default function ImagesViewer({ medias, initialIndex, close }: ImagesViewerI) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const prev = () => currentIndex === 0 ? setCurrentIndex(medias.length - 1) : setCurrentIndex(currentIndex - 1)
  const next = () => (currentIndex + 1) > (medias.length - 1) ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1)

  return (
    <Container>
      <Close onClick={close}>
        <FiX />
      </Close>

      {initialIndex > 0 || medias.length > 1 ? (
        <Button className="prev" onClick={prev}>
          <FiChevronLeft />
        </Button>
      ) : null}

      <ImageContainer>
        <Image src={medias[currentIndex].url} alt="" layout="fill" />
      </ImageContainer>

      {medias.length > 1 ? (
        <Button className="next" onClick={next}>
          <FiChevronRight />
        </Button>
      ) : null}
    </Container>
  )
}
