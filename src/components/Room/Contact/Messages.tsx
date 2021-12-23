import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import moment from "moment"
import { useAppDispatch, useAppSelector, useMsgContainer } from "../../../hooks"
import UserActions from "../../../store/actions/user"
import { orderMessages } from "../../../utils/roomUtil"
import { Contact } from "../../../types/user"
import { contactService } from "../../../services/api"

import { AudioPlayer } from "../../"
import {
    Container,
    LoadingMessages,
    Message,
    Inner,
    Content,
    Medias,
    Text,
    Time,
    Date,
    ScrollToBottom,
} from "../../../styles/components/Room/Messages"
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

    const [loadingMessages, setLoadingMessages] = useState(false)

    const user_id = useAppSelector(state => state.user.id)
    const contacts = useAppSelector(state => state.user.contacts)
    const dispatch = useAppDispatch()


    useEffect(() => {
        // use the saved position
        scrollToBottom()
    }, [contact.id, scrollToBottom])

    useEffect(() => {
        if (!contact.extra?.fetch_messages_count) {
            setLoadingMessages(true)
            contactService.getMessages(contact).then(messages => {
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
            contactService.viewMessages(contact.id)
                .then(() => dispatch(UserActions.updateRoom({ field: "contacts", where: { id: contact.id }, set: { unread_messages: 0 } })))
        }

        scrollToBottom(true)
    }, [contact, contact.messages.length, dispatch, scrollToBottom])

    function handleScrollCallback() {
        if (!containerRef.current) return
        const { scrollTop, scrollHeight } = containerRef.current
        const { fetch_messages_count, full_loaded } = contact.extra
        dispatch(UserActions.updateExtraRoomData({ field: "contacts", where: { id: contact.id }, set: { last_scroll_position: scrollTop } }))

        if (scrollTop < 200 && !loadingMessages && fetch_messages_count > 0 && !full_loaded) {
            setLoadingMessages(true)

            contactService.getMessages(contact).then(messages => {
                if (!messages.length) {
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

    const renderMessages = useCallback(() => {
        if (conatinerScroll && containerRef.current) {
            const { scrollHeight, scrollTop } = containerRef.current
            const { lastHeight, lastTop } = conatinerScroll

            containerRef.current.scrollTo(0, scrollHeight - lastHeight + (scrollTop > 0 ? lastTop : 0))
            setContainerScroll(undefined)
        }

        return orderMessages(contacts.find(c => c.id === contact.id)?.messages || []).map((message, i, arr) => {
            if (message.date) return (<Date key={message.id}>{message.date}</Date>);

            return (
                <Message
                    key={message.id}
                    className={`${message?.sender_id === arr[i - 1]?.sender_id ? "concat" : ""} ${message.sender_id === user_id ? "sender" : ""}`}
                >
                    <Content>
                        {message?.medias?.length ? (
                            <Medias>
                                {message?.medias?.map(m => m.type === "image" ? (
                                    <img key={m.id} src={m.url} />
                                ) : null)}

                                {message?.medias?.map(m => m.type === "video" ? (
                                    <video key={m.id} src={m.url} controls />
                                ) : null)}

                                {message?.medias?.map(m => m.type === "audio" ? (
                                    <AudioPlayer key={m.id} src={m.url} />
                                ) : null)}
                            </Medias>
                        ) : null}

                        {message.text ? (
                            <Inner>
                                <Text>{message.text}</Text>
                            </Inner>
                        ) : null}

                        <Time>{moment(message.created_at).format("HH:mm A")}</Time>
                    </Content>
                </Message>
            )
        })
    }, [contacts, contact.id, user_id, conatinerScroll])

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
