import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { useAppDispatch, useAppSelector, useMsgContainer } from "~/hooks";
import { Group, GroupMediaMessage } from "~/types/user";
import { orderMessages } from "~/helpers/roomUtil";
import { groupService } from "~/services/api";
import UserActions from "~/store/actions/UserActions";

import { AudioPlayer, Avatar, MediasViewer } from "../../"
import {
  Container,
  LoadingMessages,
  Message,
  Sender,
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

  const [viewMedias, setViewMedias] = useState<GroupMediaMessage[]>()
  const [viewMediaIndex, setViewMediaIndex] = useState(0)
  const [loadingMessages, setLoadingMessages] = useState(false)

  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch();

  useEffect(() => {
    scrollToBottom()
    setTimeout(() => scrollToBottom(), 200)
  }, [group.id, scrollToBottom])

  useEffect(() => {
    if (!group.extra?.fetch_messages_count) {
      setLoadingMessages(true)
      groupService.messages.index(group.id).then(messages => {
        dispatch({ type: "UNSHIFT_ROOM_MESSAGES", field: "groups", where: { id: group.id }, set: { messages } })
        dispatch(UserActions.updateExtraRoomData({
          field: "groups",
          where: { id: group.id },
          set: {
            fetch_messages_count: 1,
            full_loaded: messages.length < limit
          }
        }))

        setLoadingMessages(false)
        scrollToBottom()
      })
    }
  }, [group, dispatch, scrollToBottom])

  useEffect(() => {
    if (group.messages.length && group.unread_messages > 0) {
      groupService.messages.view(group.id).then(() =>
        dispatch(UserActions.updateRoom({ field: "groups", where: { id: group.id }, set: { unread_messages: 0 } }))
      );
    }

    scrollToBottom(group.messages[group.messages.length - 1]?.sender_id === group.id)
  }, [group, group.messages.length, scrollToBottom])

  function handleScrollCallback() { }

  function selectMediasToView(medias: GroupMediaMessage[], initialIndex: number) {
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

    return orderMessages(group.messages || []).map((message, i, arr) => {
      if (message.date) return (<Date key={message.id}>{message.date}</Date>);

      const sent_last = message?.sender_id === arr[i - 1]?.sender_id;
      const sender = message.sender_id === user.id

      return (
        <Message
          key={message.id}
          className={`${sent_last ? "concat" : ""} ${sender ? "sender" : ""}`}
        >
          {!sent_last ? (
            <Sender className={sender ? "reverse" : ""}>
              <Avatar size="5rem" src={message.sender.picture} />
              <span style={{ fontSize: "1.4rem" }}>{message.sender.username}</span>
            </Sender>
          ) : null}

          <Content>
            {message?.medias?.length ? (
              <Medias className={message?.medias[0]?.type}>
                {message.medias.map((m, index) => m.type === "image" ? (
                  <ImageContainer key={m.id} onClick={() => selectMediasToView(message.medias, index)}>
                    <Image src={m.url} alt="" layout="fill" priority />
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
  }, [user, group, conatinerScroll, viewMedias, viewMediaIndex])

  return (
    <Container ref={containerRef} onScroll={() => handleScroll(handleScrollCallback)} className="group">
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