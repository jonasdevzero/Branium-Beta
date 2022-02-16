import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { useAppDispatch, useAppSelector, useMsgContainer, useWarn } from "~/hooks";
import { Group, GroupMediaMessage } from "~/types/user";
import { orderMessages } from "~/helpers/roomUtil";
import { groupService } from "~/services/api";
import UserActions from "~/store/actions/UserActions";

import { Avatar, ImagesViewer, MediasRender } from "../../"
import {
  Container,
  LoadingMessages,
  Message,
  Sender,
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
import { FiChevronDown, FiMoreHorizontal } from "react-icons/fi"

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

  const [viewImg, setViewImg] = useState<GroupMediaMessage[]>()
  const [viewImgIndex, setViewImgIndex] = useState(0)

  const [loadingMessages, setLoadingMessages] = useState(false)

  const [showActionBtn, setShowActionBtn] = useState("");
  const [showAction, setShowAction] = useState(false);

  const [msgLength, setMsgLength] = useState(group.messages.length);

  const user = useAppSelector(state => state.user)

  const warn = useWarn();
  const dispatch = useAppDispatch();

  useEffect(() => {
    scrollToBottom()
    setTimeout(() => scrollToBottom(), 200)
  }, [group.id, scrollToBottom])

  useEffect(() => {
    if (!group.extra?.fetch_messages_count) {
      setLoadingMessages(true)
      groupService.messages.index(group).then(messages => {
        setMsgLength(msgLength + messages.length)

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

    if (msgLength !== group.messages.length) { 
      const isNewMessage = msgLength < group.messages.length;
      const isDeleting = msgLength > group.messages.length;
      const sentLast = group.messages[group.messages.length - 1]?.sender_id === user.id;
      
      scrollToBottom({ isNewMessage, sentLast, isDeleting });
      isNewMessage ? setMsgLength(msgLength + 1) : isDeleting ? setMsgLength(msgLength - 1) : null;
    }
  }, [group, group.messages.length, scrollToBottom, msgLength])

  function handleScrollCallback() {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight } = containerRef.current;
    const { fetch_messages_count, full_loaded } = group.extra;

    dispatch(UserActions.updateExtraRoomData({
      field: "groups",
      where: { id: group.id },
      set: { last_scroll_position: scrollTop }
    }));

    if (scrollTop < 200 && !loadingMessages && fetch_messages_count > 0 && !full_loaded) {
      setLoadingMessages(true);

      groupService.messages.index(group).then(messages => {
        setMsgLength(msgLength + messages.length);
        
        if (!messages.length) {
          setLoadingMessages(false);
          dispatch(UserActions.updateExtraRoomData({
            field: "groups",
            where: { id: group.id },
            set: { full_loaded: true }
          }));

          return;
        }

        messages.length < limit ?
          dispatch(UserActions.updateExtraRoomData({
            field: "groups",
            where: { id: group.id },
            set: { full_loaded: true }
          })) : null;

        dispatch(UserActions.unshiftRoomMessages({
          field: "groups",
          where: { id: group.id },
          set: { messages }
        }));

        setContainerScroll({ lastHeight: scrollHeight, lastTop: scrollTop });
        setLoadingMessages(false);
      })
    }
  }

  function viewImages(medias: GroupMediaMessage[], initialIndex: number) {
    setViewImg(medias)
    setViewImgIndex(initialIndex)
  }

  function closeActions() {
    setShowActionBtn("")
    setShowAction(false)
  }

  const onMouseOver = (message_id: string) => !showAction ? setTimeout(() => setShowActionBtn(message_id), 50) : null

  const onMouseLeave = () => !showAction ? closeActions() : null;

  function deleteMessage(message_id: string) {
    closeActions()

    groupService.messages.delete(message_id)
      .catch(warn.error);
  }

  const renderMessages = useCallback(() => {
    if (conatinerScroll && containerRef.current) {
      const { scrollHeight, scrollTop } = containerRef.current
      const { lastHeight, lastTop } = conatinerScroll

      containerRef.current.scrollTo(0, scrollHeight - lastHeight + (scrollTop > 0 ? lastTop : 0))
      setContainerScroll(undefined)
    }

    return orderMessages(group.messages || []).map((message, i, arr) => {
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
          {!sent_last ? (
            <Sender className={sender === "sender" ? "reverse" : ""}>
              <Avatar size="5rem" src={message.sender.picture} />
              <span style={{ fontSize: "1.4rem" }}>{message.sender.username}</span>
            </Sender>
          ) : null}

          <Content>
            <MediasRender medias={message.medias} viewFullScreen={viewImages} />

            <Inner className={!message.text ? "no__text" : ""}>
              {message.text ? (<Text>{message.text}</Text>) : null}
            </Inner>

            <Time>{moment(message.created_at).format("HH:mm A")}</Time>
          </Content>

          <Actions className={`${sender} ${showActionBtn !== message.id || message.sender_id !== user.id ? "hidden" : ""}`}>
            <span onClick={() => setShowAction(!showAction)}>
              <FiMoreHorizontal />
            </span>

            {showAction && (
              <ActionsBox
                className={sender}
                onMouseLeave={closeActions}
              >
                <Action type="button" onClick={() => deleteMessage(message.id)}>
                  Apagar mensagem
                </Action>
              </ActionsBox>
            )}
          </Actions>
        </Message>
      )
    })
  }, [user, group, conatinerScroll, viewImg, viewImgIndex, showActionBtn, showAction])

  return (
    <Container ref={containerRef} onScroll={() => handleScroll(handleScrollCallback)} className="group">
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