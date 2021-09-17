import { useState } from "react"
import { Picker, BaseEmoji } from "emoji-mart"
import "emoji-mart/css/emoji-mart.css"
import { contactService } from "../../services/api"
import { useWarn } from "../../hooks"

import {
    Container,
    Inner,
    Input,
    MediaInput,
    Submit,
    Icon,
    EmojiPickerContainer,
} from "../../styles/components/Room/Form"
import {
    FiSmile,
    FiPaperclip,
    FiSend,
    FiMic,
} from "react-icons/fi"

export default function Form({ contact_id }: { contact_id: string }) {
    const [message, setMessage] = useState("")
    const [medias, setMedias] = useState<File[]>([])
    const [mediasPreview, setMediasPreview] = useState<string[]>([])

    const [showEmojiPicker, setShowEmojiPicker] = useState(false) 

    const warn = useWarn()

    function handleMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        contactService.createMessage({ to: contact_id, text: message })
            .then(() => setMessage(""))
            .catch(error => warn.error(error))
    }

    function handleMedia(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;

        const selectedMedias = Array.from(e.target.files)
        setMedias([...medias, ...selectedMedias])

        const selectedMediasPreview = selectedMedias.map(m => URL.createObjectURL(m))
        setMediasPreview([...mediasPreview, ...selectedMediasPreview])
    }

    return (
        <Container onSubmit={handleMessage}>
            {showEmojiPicker ? (
                <EmojiPickerContainer>
                    <Picker theme="dark" onSelect={(emoji: BaseEmoji) => setMessage(message.concat(emoji.native))} />
                </EmojiPickerContainer>
            ) : null}

            <Icon onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <FiSmile />
            </Icon>

            <Icon htmlFor="media[]">
                <FiPaperclip />
            </Icon>
            <MediaInput type="file" id="media[]" multiple onChange={handleMedia} />

            <Inner>
                <Input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    autoComplete="off"
                    onFocus={() => setShowEmojiPicker(false)}
                />

                <Submit>
                    <FiSend />
                </Submit>
            </Inner>

            <Icon>
                <FiMic />
            </Icon>
        </Container>
    )
}
