import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import moment from "moment"
import { useAppDispatch, useAppSelector, useMsgContainer, useWarn } from "~/hooks"
import UserActions from "~/store/actions/UserActions"
import { orderMessages } from "~/helpers/roomUtil"
import { Contact, ContactMediaMessage } from "~/types/user"
import { contactService } from "~/services/api"

import { ImagesViewer, MediasRender } from "../../"
import {
  Container,
  LoadingMessages,
  Message,
  Inner,
  Content,
  Text,
  Time,
  Date,
  ScrollToBottom,
  Actions,
  ActionsBox,
  Action,
} from "~/styles/components/Room/Messages"
import {
  FiChevronDown,
  FiMoreHorizontal,
} from "react-icons/fi"

type ContainerScroll = {
  lastHeight: number
  lastTop: number
}

const limit = 30

export default function Messages({ contact }: { contact: Contact }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [conatinerScroll, setContainerScroll] = useState<ContainerScroll>()
  const { showScrollBtn, handleScroll, scrollToBottom } = useMsgContainer(containerRef)

  const [viewImg, setViewImg] = useState<ContactMediaMessage[]>()
  const [viewImgIndex, setViewImgIndex] = useState(0)

  const [loadingMessages, setLoadingMessages] = useState(false)

  const [showActionBtn, setShowActionBtn] = useState("");
  const [showAction, setShowAction] = useState(false);

  const [msgLength, setMsgLength] = useState(contact.messages.length)

  const user = useAppSelector(state => state.user)

  const warn = useWarn()
  const dispatch = useAppDispatch()

  useEffect(() => {
    scrollToBottom()
    setTimeout(() => scrollToBottom(), 200)
  }, [contact.id, scrollToBottom])

  useEffect(() => {
    if (!contact.extra?.fetch_messages_count) {
      setLoadingMessages(true)
      contactService.messages.index(contact).then(messages => {
        setMsgLength(msgLength + messages.length)

        dispatch({ type: "UNSHIFT_ROOM_MESSAGES", field: "contacts", where: { id: contact.id }, set: { messages } })
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
        .then(() => dispatch(UserActions.updateRoom({
          field: "contacts",
          where: { id: contact.id },
          set: { unread_messages: 0 }
        })))
    }

    if (msgLength !== contact.messages.length) {
      const isNewMessage = msgLength < contact.messages.length;
      const isDeleting = msgLength > contact.messages.length;
      const sentLast = contact.messages[contact.messages.length - 1]?.sender_id === contact.id

      scrollToBottom({ isNewMessage, sentLast, isDeleting })
      isNewMessage ? setMsgLength(msgLength + 1) : isDeleting ? setMsgLength(msgLength - 1) : null;
    }
  }, [contact, contact.messages.length, dispatch, scrollToBottom])

  function handleScrollCallback() {
    if (!containerRef.current) return

    const { scrollTop, scrollHeight } = containerRef.current
    const { fetch_messages_count, full_loaded } = contact.extra

    dispatch(UserActions.updateExtraRoomData({
      field: "contacts",
      where: { id: contact.id },
      set: { last_scroll_position: scrollTop }
    }))

    if (scrollTop < 200 && !loadingMessages && fetch_messages_count > 0 && !full_loaded) {
      setLoadingMessages(true)

      contactService.messages.index(contact).then(messages => {
        setMsgLength(msgLength + messages.length)

        if (!messages.length) {
          setLoadingMessages(false)
          dispatch(UserActions.updateExtraRoomData({
            field: "contacts",
            where: { id: contact.id },
            set: { full_loaded: true }
          }))

          return;
        }

        messages.length < limit ?
          dispatch(UserActions.updateExtraRoomData({
            field: "contacts",
            where: { id: contact.id },
            set: { full_loaded: true }
          })) : null

        dispatch(UserActions.unshiftRoomMessages({
          field: "contacts",
          where: { id: contact.id },
          set: { messages }
        }));

        setContainerScroll({ lastHeight: scrollHeight, lastTop: scrollTop })
        setLoadingMessages(false)
      })
    }
  }

  function viewImages(medias: ContactMediaMessage[], initialIndex: number) {
    setViewImg(medias)
    setViewImgIndex(initialIndex)
  }

  function closeActions() {
    setShowActionBtn("")
    setShowAction(false)
  }

  const onMouseOver = (message_id: string) => !showAction ? setTimeout(() => setShowActionBtn(message_id), 50) : null

  const onMouseLeave = () => !showAction ? closeActions() : null;

  function deleteMessage(message_id: string, target: "me" | "bidirectional") {
    closeActions()

    contactService.messages.deleteOne(message_id, target)
      .then(() => {
        const action = target === "me" ? "removeRoomMessage" : "removeBidirectionalMessage"
        const field_id = target === "me" ? "message_id" : "bidirectional_id"

        dispatch(UserActions[action]({
          field: "contacts",
          where: { id: contact.id, [field_id]: message_id }
        }))
      })
      .catch(warn.error)
  }

  const renderMessages = useCallback(() => {
    if (conatinerScroll && containerRef.current) {
      const { scrollHeight, scrollTop } = containerRef.current
      const { lastHeight, lastTop } = conatinerScroll

      containerRef.current.scrollTo(0, scrollHeight - lastHeight + (scrollTop > 0 ? lastTop : 0))
      setContainerScroll(undefined)
    }

    return orderMessages(contact.messages || []).map((message, i, arr) => {
      if (message.date) return (
        <Date key={message.id}>
          <span>{message.date}</span>
        </Date>
      );

      const sent_last = message?.sender_id === arr[i - 1]?.sender_id;
      const sender = message.sender_id === user.id ? "sender" : "receiver";

      return (
        <Message
          key={message.id}
          className={`${sent_last ? "concat" : ""} ${sender}`}
          onMouseOver={() => onMouseOver(message.id)}
          onMouseLeave={onMouseLeave}
        >
          <Content>
            <MediasRender medias={message.medias} viewFullScreen={viewImages} />

            <Inner className={!message.text ? "no__text" : ""}>
              {message.text ? (<Text>{message.text}</Text>) : null}
            </Inner>

            <Time>{moment(message.created_at).format("HH:mm A")}</Time>
          </Content>

          <Actions className={`${sender} ${showActionBtn !== message.id ? "hidden" : ""}`}>
            <span onClick={() => setShowAction(!showAction)}>
              <FiMoreHorizontal />
            </span>

            {showAction && (
              <ActionsBox
                className={sender}
                onMouseLeave={closeActions}
              >
                <Action type="button" onClick={() => deleteMessage(message.id, "me")}>
                  Apagar para mim
                </Action>

                {sender === "sender" ? (
                  <Action type="button" onClick={() => deleteMessage(message.bidirectional_id, "bidirectional")}>
                    Apagar para todos
                  </Action>
                ) : null}
              </ActionsBox>
            )}
          </Actions>
        </Message>
      )
    })
  }, [user, contact, conatinerScroll, viewImg, viewImgIndex, showActionBtn, showAction])

  return (
    <Container ref={containerRef} onScroll={() => handleScroll(handleScrollCallback)}>
      {loadingMessages ? (
        <LoadingMessages>
          <Image src="/images/loading-light.svg" alt="loading" width="35" height="35" />
        </LoadingMessages>
      ) : null}

      {renderMessages()}

      {viewImg ? (
        <ImagesViewer
          medias={viewImg}
          initialIndex={viewImgIndex}
          close={() => setViewImg(undefined)}
        />
      ) : null}

      {showScrollBtn ? (
        <ScrollToBottom onClick={() => scrollToBottom()}>
          <FiChevronDown />
        </ScrollToBottom>
      ) : null}
    </Container>
  )
}
