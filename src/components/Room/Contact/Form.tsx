import { useState } from "react"
import { Picker, BaseEmoji } from "emoji-mart"
import "emoji-mart/css/emoji-mart.css"
import { contactService } from "../../../services/api"
import { useWarn } from "../../../hooks"

import {
    Container,
    Inner,
    Input,
    MediaInput,
    Submit,
    Icon,
    EmojiPickerContainer,
    UploadOptions,
    UploadOption,
    PreviewMediasContainer,
    PreviewMediasContent,
    FilesContainer,
    AudioWrapper,
    MediaSubmit,
} from "../../../styles/components/Room/Form"
import {
    FiSmile,
    FiPaperclip,
    FiSend,
    FiMic,
    FiFile,
    FiFilm,
} from "react-icons/fi"
import { AiOutlinePicture } from "react-icons/ai"
import AudioPlayer from "../AudioPlayer"

type MediaType = "image" | "application" | "audio" | "video"

export default function Form({ contact_id }: { contact_id: string }) {
    const [message, setMessage] = useState("")
    const [medias, setMedias] = useState<File[]>([])
    const [mediaType, setMediaType] = useState<MediaType>()
    const [mediasPreview, setMediasPreview] = useState<string[]>([])

    const [uploadOptions, setUploadOptions] = useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const warn = useWarn()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        contactService.createMessage({ to: contact_id, text: message, medias })
            .then(() => {
                setMessage("")
                setMedias([])
                setMediasPreview([])
                setMediaType(undefined)
            })
            .catch(error => warn.error(error))
    }

    function handleMedia(e: React.ChangeEvent<HTMLInputElement>) {
        setUploadOptions(false)
        if (!e.target.files) return;
        const type = e.target.files[0].type.split("/")[0] as MediaType

        setMediaType(type)
        const selectedMedias = Array.from(e.target.files)
        setMedias([...medias, ...selectedMedias])

        const selectedMediasPreview = selectedMedias.map(m => URL.createObjectURL(m))
        setMediasPreview([...mediasPreview, ...selectedMediasPreview])
    }

    function renderMediasPreview() {
        return (
            <PreviewMediasContainer>
                <PreviewMediasContent>
                    {mediaType === "image" ? (
                        mediasPreview.map(m => (<img key={m} src={m} />))
                    ) : mediaType === "application" ? (
                        <FilesContainer>
                            <h3>Files</h3>

                            {medias.map(m => (<p key={m.name}>{m.name}</p>))}
                        </FilesContainer>
                    ) : mediaType === "audio" ? (
                        <AudioWrapper>
                            <AudioPlayer src={mediasPreview[0]} />
                        </AudioWrapper>
                    ) : mediaType === "video" ? (
                        <video src={mediasPreview[0]} controls />
                    ) : null}

                    <Inner>
                        {mediaType !== "audio" ? (
                            <>
                                <Input
                                    type="text"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    autoComplete="off"
                                    onFocus={() => {
                                        setShowEmojiPicker(false)
                                        setUploadOptions(false)
                                    }}
                                    placeholder="Digite alguma coisa..."
                                />

                                <Submit type="submit">
                                    <FiSend />
                                </Submit>
                            </>
                        ) : (
                            <MediaSubmit type="submit">
                                Enviar
                            </MediaSubmit>
                        )}

                    </Inner>
                </PreviewMediasContent>
            </PreviewMediasContainer>
        )
    }

    return (
        <Container onSubmit={handleSubmit}>
            {mediasPreview.length ? renderMediasPreview() : null}

            {showEmojiPicker ? (
                <EmojiPickerContainer>
                    <Picker theme="dark" onSelect={(emoji: BaseEmoji) => setMessage(message.concat(emoji.native))} />
                </EmojiPickerContainer>
            ) : null}

            <Icon type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <FiSmile />
            </Icon>

            <Icon type="button">
                <span onClick={() => setUploadOptions(!uploadOptions)}>
                    <FiPaperclip />
                </span>

                {uploadOptions ? (
                    <UploadOptions>
                        <UploadOption htmlFor="video">
                            <FiFilm />
                        </UploadOption>
                        <MediaInput type="file" accept=".mp4" id="video" onChange={handleMedia} />

                        <UploadOption htmlFor="audio">
                            <FiMic />
                        </UploadOption>
                        <MediaInput type="file" accept=".mp3,.ogg,.wav" id="audio" onChange={handleMedia} />

                        <UploadOption htmlFor="files[]">
                            <FiFile />
                        </UploadOption>
                        <MediaInput type="file" accept=".pdf,.docx,.txt,.xls,.ppt" id="files[]" multiple onChange={handleMedia} />

                        <UploadOption htmlFor="pictures[]">
                            <AiOutlinePicture />
                        </UploadOption>
                        <MediaInput type="file" accept=".png,.jpg,.jpeg,.gif" id="pictures[]" multiple onChange={handleMedia} />
                    </UploadOptions>
                ) : null}
            </Icon>

            <Inner>
                <Input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    autoComplete="off"
                    onFocus={() => {
                        setShowEmojiPicker(false)
                        setUploadOptions(false)
                    }}
                    placeholder="Digite alguma coisa..."
                />

                <Submit type="submit">
                    <FiSend />
                </Submit>
            </Inner>

            <Icon type="button">
                <FiMic />
            </Icon>
        </Container>
    )
}
