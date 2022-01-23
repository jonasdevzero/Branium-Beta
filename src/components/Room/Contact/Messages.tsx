import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import moment from "moment"
import { useAppDispatch, useAppSelector, useMsgContainer } from "~/hooks"
import UserActions from "~/store/actions/user"
import { orderMessages } from "~/utils/roomUtil"
import { Contact, ContactMediaMessage } from "~/types/user"
import { contactService } from "~/services/api"

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

type ContainerScroll = {
  lastHeight: number
  lastTop: number
}

const limit = 30

export default function Messages({ contact }: { contact: Contact }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [conatinerScroll, setContainerScroll] = useState<ContainerScroll>()
  const { showScrollBtn, handleScroll, scrollToBottom } = useMsgContainer(containerRef)

  const [viewMedias, setViewMedias] = useState<ContactMediaMessage[]>()
  const [viewMediaIndex, setViewMediaIndex] = useState(0)
  const [loadingMessages, setLoadingMessages] = useState(false)

  const user = useAppSelector(state => state.user)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // use the saved position
    scrollToBottom()
    setTimeout(() => scrollToBottom(), 500)
  }, [contact.id, scrollToBottom])

  useEffect(() => {
    if (!contact.extra?.fetch_messages_count) {
      setLoadingMessages(true)
      contactService.messages.index(contact).then(messages => {
        dispatch({ type: "UNSHIFT_CONTACT_MESSAGES", where: { id: contact.id }, set: { messages } })
        dispatch(UserActions.updateExtraRoomData({
          field: "contacts",
          where: { id: contact.id },
          set: {
            fetch_messages_count: 1,
            full_loaded: messages.length < limit
          }
        }))

        setLoadingMessages(false)
        scrollToBottom()
      })
    }
  }, [contact, dispatch, scrollToBottom])

  useEffect(() => {
    if (contact.messages.length && contact.unread_messages > 0) {
      contactService.messages.view(contact.id)
        .then(() => dispatch(UserActions.updateRoom({ field: "contacts", where: { id: contact.id }, set: { unread_messages: 0 } })))
    }

    scrollToBottom(contact.messages[contact.messages.length - 1]?.sender_id === contact.id)
  }, [contact, contact.messages.length, dispatch, scrollToBottom])

  function handleScrollCallback() {
    if (!containerRef.current) return
    const { scrollTop, scrollHeight } = containerRef.current
    const { fetch_messages_count, full_loaded } = contact.extra
    dispatch(UserActions.updateExtraRoomData({ field: "contacts", where: { id: contact.id }, set: { last_scroll_position: scrollTop } }))

    if (scrollTop < 200 && !loadingMessages && fetch_messages_count > 0 && !full_loaded) {
      setLoadingMessages(true)

      contactService.messages.index(contact).then(messages => {
        if (!messages.length) {
          setLoadingMessages(false)
          dispatch(UserActions.updateExtraRoomData({ field: "contacts", where: { id: contact.id }, set: { full_loaded: true } }))
          return
        }

        if (messages.length < limit) {
          dispatch(UserActions.updateExtraRoomData({ field: "contacts", where: { id: contact.id }, set: { full_loaded: true } }))
        }

        dispatch({ type: "UNSHIFT_CONTACT_MESSAGES", where: { id: contact.id }, set: { messages } })
        setContainerScroll({ lastHeight: scrollHeight, lastTop: scrollTop })
        setLoadingMessages(false)
      })
    }
  }

  function selectMediasToView(medias: ContactMediaMessage[], initialIndex: number) {
    setViewMedias(medias)
    setViewMediaIndex(initialIndex)
  }

  const renderMessages = useCallback(() => {
    if (conatinerScroll && containerRef.current) {
      const { scrollHeight, scrollTop } = containerRef.current
      const { lastHeight, lastTop } = conatinerScroll

      containerRef.current.scrollTo(0, scrollHeight - lastHeight + (scrollTop > 0 ? lastTop : 0))
      setContainerScroll(undefined)
    }

    return orderMessages(contact.messages || []).map((message, i, arr) => {
      if (message.date) return (<Date key={message.id}>{message.date}</Date>);

      return (
        <Message
          key={message.id}
          className={`${message?.sender_id === arr[i - 1]?.sender_id ? "concat" : ""} ${message.sender_id === user.id ? "sender" : ""}`}
        >
          <Content>
            {message?.medias?.length ? (
              <Medias className={message?.medias[0]?.type}>
                {message.medias.map((m, index) => m.type === "image" ? (
                  <ImageContainer key={m.id} onClick={() => selectMediasToView(message.medias, index)}>
                    <Image src={m.url} alt="" layout="fill" />
                  </ImageContainer>
                ) : m.type === "video" ? (
                  <video key={m.id} src={m.url} controls />
                ) : m.type === "audio" ? (
                  <AudioPlayer key={m.id} src={m.url} />
                ) : null)}
              </Medias>
            ) : null}

            <Inner className={!message.text ? "no__text" : ""}>
              {message.text ? (
                <Text>{message.text}</Text>
              ) : null}
            </Inner>

            <Time>{moment(message.created_at).format("HH:mm A")}</Time>
          </Content>

          {viewMedias ? (
            <MediasViewer
              medias={viewMedias}
              initialIndex={viewMediaIndex}
              close={() => setViewMedias(undefined)}
            />
          ) : null}
        </Message>
      )
    })
  }, [user, contact, conatinerScroll, viewMedias, viewMediaIndex])

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
