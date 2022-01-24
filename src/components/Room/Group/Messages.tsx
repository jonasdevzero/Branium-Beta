import { useRef, useState } from "react";
import Image from "next/image";
import { useMsgContainer } from "~/hooks";
import { Group } from "~/types/user";

import { AudioPlayer, MediasViewer } from "../../"
import {
  Container,
  LoadingMessages,
  Message,
  Inner,
  Content,
  Medias,
  ImageContainer,
  Text,
  Time,
  Date,
  ScrollToBottom,
} from "~/styles/components/Room/Messages"
import { FiChevronDown } from "react-icons/fi"

interface MessagesI {
  group: Group
}

type ContainerScroll = {
  lastHeight: number
  lastTop: number
}

const limit = 30

export default function Messages({ group }: MessagesI) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [conatinerScroll, setContainerScroll] = useState<ContainerScroll>()
  const { showScrollBtn, handleScroll, scrollToBottom } = useMsgContainer(containerRef)

  const [loadingMessages, setLoadingMessages] = useState(false)

  function handleScrollCallback() {}

  function renderMessages() {
    return (
      <h1>Messages</h1>
    )
  }
  
  return (
    <Container ref={containerRef} onScroll={() => handleScroll(handleScrollCallback)}>
      {loadingMessages ? (
        <LoadingMessages>
          <Image src="/images/loading-light.svg" alt="loading" width="35" height="35" />
        </LoadingMessages>
      ) : null}

      {renderMessages()}

      {showScrollBtn ? (
        <ScrollToBottom onClick={() => scrollToBottom()}>
          <FiChevronDown />
        </ScrollToBottom>
      ) : null}
    </Container>
  )
}