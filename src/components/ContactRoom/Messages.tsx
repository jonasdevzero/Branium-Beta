import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import moment from "moment"
import { useAppDispatch, useAppSelector, useMsgContainer } from "../../hooks"
import UserActions from "../../store/actions/user"
import { orderMessages } from "../../utils/roomUtil"
import { Contact } from "../../types/user"
import { contactService } from "../../services/api"

import {
    Container,
    LoadingMessages,
    Message,
    Inner,
    Text,
    Time,
    Date,
    ScrollToBottom,
} from "../../styles/components/Room/Messages"
import { FiChevronDown } from "react-icons/fi"

export default function Messages({ contact }: { contact: Contact }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { showScrollBtn, handleScroll, scroll } = useMsgContainer(containerRef)

    const [fullLoaded, setFullLoaded] = useState(false)
    const [loadedCount, setLoadedCount] = useState(0)
    const [loadingMessages, setLoadingMessages] = useState(false)

    const { contacts, user_id } = useAppSelector(state => ({ contacts: state.user.contacts, user_id: state.user.id }))
    const dispatch = useAppDispatch()

    useEffect(() => {
        setFullLoaded(false)
        scroll()
    }, [contact.id, scroll])

    useEffect(() => {
        if (!contact.loaded_messages) {
            setLoadingMessages(true)
            contactService.getMessages(contact.id, loadedCount)
                .then(messages => dispatch(UserActions.updateRoom({ roomType: "contacts", whereId: contact.id, set: { messages, loaded_messages: true } })))
                .then(() => {
                    scroll()
                    setLoadedCount(loadedCount + 1)
                    setLoadingMessages(false)
                })
        }
    }, [contact.id, contact.loaded_messages, dispatch, scroll, loadedCount])

    useEffect(() => {
        if (contact.messages.length && contact.unread_messages > 0) {
            contactService.viewMessages(contact.id)
                .then(() => dispatch(UserActions.updateRoom({ roomType: "contacts", whereId: contact.id, set: { unread_messages: 0 } })))
        }

        scroll(true)
    }, [contact, contact.messages.length, dispatch, scroll])

    function handleScrollCallback() {
        if (!containerRef.current) return
        const { scrollTop } = containerRef.current

        if (scrollTop < 200 && !loadingMessages && !fullLoaded) {
            setLoadingMessages(true)
            contactService.getMessages(contact.id, loadedCount)
                .then(messages => {
                    if (!messages.length) {
                        setFullLoaded(true)
                        return
                    }

                    dispatch({ type: "UNSHIFT_CONTACT_MESSAGES", where: contact.id, messages })
                    setLoadedCount(loadedCount + 1)
                })
                .then(() => setLoadingMessages(false))
        }
    }

    return (
        <Container ref={containerRef} onScroll={() => handleScroll(handleScrollCallback)}>
            {loadingMessages ? (
                <LoadingMessages>
                    <Image src="/images/loading-light.svg" alt="loading" width="35" height="35" />
                </LoadingMessages>
            ) : null}

            {orderMessages(contacts.find(c => c.id === contact.id)?.messages || []).map((message, i, arr) => {
                if (message.date) return (<Date key={message.id}>{message.date}</Date>);

                return (
                    <Message key={message.id} className={message?.sender_id === arr[i - 1]?.sender_id ? "concat" : undefined}>
                        <Inner className={message.sender_id === user_id ? "sender" : undefined}>
                            <Text>{message.text}</Text>
                            <Time>{moment(message.created_at).format("HH:mm A")}</Time>
                        </Inner>
                    </Message>
                )
            })}

            {showScrollBtn ? (
                <ScrollToBottom onClick={() => scroll()}>
                    <FiChevronDown />
                </ScrollToBottom>
            ) : null}
        </Container>
    )
}
