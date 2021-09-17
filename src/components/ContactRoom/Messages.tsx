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

    const [loadingMessages, setLoadingMessages] = useState(false)

    const user_id = useAppSelector(state => state.user.id)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!contact.loaded_messages) {
            setLoadingMessages(true)
            contactService.getMessages(contact.id)
                .then(messages => dispatch(UserActions.updateRoom({ roomType: "contacts", whereId: contact.id, set: { messages, loaded_messages: true } })))
                .then(() => {
                    scroll()
                    setLoadingMessages(false)
                })
        }

        scroll()
    }, [contact.id, contact.loaded_messages, dispatch, scroll])

    useEffect(() => {
        if (contact.messages.length && contact.unread_messages > 0) {
            contactService.viewMessages(contact.id)
                .then(() => dispatch(UserActions.updateRoom({ roomType: "contacts", whereId: contact.id, set: { unread_messages: 0 } })))
        }

        scroll(true)
    }, [contact, contact.messages.length, dispatch, scroll])

    return (
        <Container ref={containerRef} onScroll={handleScroll}>
            {loadingMessages ? (
                <LoadingMessages>
                    <Image src="/images/loading-light.svg" alt="loading" width="35" height="35" />
                </LoadingMessages>
            ) : null}

            {orderMessages(contact.messages).map((message, i, arr) => {
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
