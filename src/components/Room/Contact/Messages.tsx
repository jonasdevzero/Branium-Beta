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

  const [viewMedias, setViewMedias] = useState<ContactMediaMessage[]>()
  const [viewMediaIndex, setViewMediaIndex] = useState(0)
  const [loadingMessages, setLoadingMessages] = useState(false)

  const [showActionBtn, setShowActionBtn] = useState("");
  const [showAction, setShowAction] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

    const sent_last = contact.messages[contact.messages.length - 1]?.sender_id === contact.id
    scrollToBottom(sent_last || isDeleting)
    isDeleting ? setIsDeleting(false) : null;
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
        if (!messages.length) {
          setLoadingMessages(false)
          dispatch(UserActions.updateExtraRoomData({
            field: "contacts",
            where: { id: contact.id },
            set: { full_loaded: true }
          }))

          return;
        }

        if (messages.length < limit) {
          dispatch(UserActions.updateExtraRoomData({
            field: "contacts",
            where: { id: contact.id },
            set: { full_loaded: true }
          }))
        }

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

  function selectMediasToView(medias: ContactMediaMessage[], initialIndex: number) {
    setViewMedias(medias)
    setViewMediaIndex(initialIndex)
  }

  function onMouseOver(message_id: string) {
    !showAction ? setTimeout(() => setShowActionBtn(message_id), 50) : null
  }

  function onMouseLeave() {
    if (!showAction) {
      setShowActionBtn("")
      setShowAction(false)
    }
  }

  function deleteMessage(message_id: string, target: "me" | "bidirectional") {
    setShowActionBtn("")
    setShowAction(false)
    setIsDeleting(true)

    contactService.messages.deleteOne(message_id, target)
      .then(() => {
        const action = target === "me" ? "removeRoomMessage" : "removeBidirectionalMessage"
        const messageDirection = target === "me" ? "message_id" : "bidirectional_id"

        dispatch(UserActions[action]({
          field: "contacts",
          where: { id: contact.id, [messageDirection]: message_id }
        }))
      })
      .catch(error => warn.error(error))
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

      const sent_last = message?.sender_id === arr[i - 1]?.sender_id;
      const sender = message.sender_id === user.id;

      return (
        <Message
          key={message.id}
          className={`${sent_last ? "concat" : ""} ${sender ? "sender" : ""}`}
          onMouseOver={() => onMouseOver(message.id)}
          onMouseLeave={() => onMouseLeave()}
        >
          <Content>
            <MediasRender medias={message.medias} viewFullScreen={selectMediasToView} />

            <Inner className={!message.text ? "no__text" : ""}>
              {message.text ? (<Text>{message.text}</Text>) : null}
            </Inner>

            <Time>{moment(message.created_at).format("HH:mm A")}</Time>
          </Content>

          <Actions className={`${sender ? "sender" : "receiver"} ${showActionBtn !== message.id ? "hidden" : ""}`}>
            <span onClick={() => setShowAction(!showAction)}>
              <FiMoreHorizontal />
            </span>

            {showAction ? (
              <ActionsBox
                className={sender ? "sender" : "receiver"}
                onMouseLeave={() => {
                  setShowActionBtn("")
                  setShowAction(false)
                }}
              >
                <Action
                  type="button"
                  onClick={() => deleteMessage(message.id, "me")}
                >
                  Apagar para mim
                </Action>

                {sender ? (
                  <Action
                    type="button"
                    onClick={() => deleteMessage(message.bidirectional_id, "bidirectional")}
                  >
                    Apagar para todos
                  </Action>
                ) : null}
              </ActionsBox>
            ) : null}
          </Actions>
        </Message>
      )
    })
  }, [user, contact, conatinerScroll, viewMedias, viewMediaIndex, showActionBtn, showAction])

  return (
    <Container ref={containerRef} onScroll={() => handleScroll(handleScrollCallback)}>
      {loadingMessages ? (
        <LoadingMessages>
          <Image src="/images/loading-light.svg" alt="loading" width="35" height="35" />
        </LoadingMessages>
      ) : null}

      {renderMessages()}

      {viewMedias ? (
        <ImagesViewer
          medias={viewMedias}
          initialIndex={viewMediaIndex}
          close={() => setViewMedias(undefined)}
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
