import { useState } from "react"
import Image from "next/image"
import { Picker, BaseEmoji } from "emoji-mart"
import "emoji-mart/css/emoji-mart.css"
import { groupService } from "~/services/api"
import { useWarn } from "~/hooks"

import AudioPlayer from "../AudioPlayer"
import AudioRecorder from "../AudioRecorder"
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
  PreviewMediasInner,
  PreviewMediasForm,
  FilesContainer,
  FileBox,
  AudioWrapper,
  ImageContainer,
} from "~/styles/components/Room/Form"
import {
  FiSmile,
  FiPaperclip,
  FiSend,
  FiMic,
  FiFile,
  FiFilm,
  FiChevronRight,
  FiChevronLeft,
  FiX,
  FiTrash2,
} from "react-icons/fi"
import { AiOutlinePicture } from "react-icons/ai"

interface FormI {
  group_id: string
}

type MediaType = "image" | "application" | "audio" | "video"

export default function Form({ group_id }: FormI) {
  const [message, setMessage] = useState("")
  const [medias, setMedias] = useState<File[]>([])
  const [record, setRecord] = useState(false)

  const [mediaType, setMediaType] = useState<MediaType>()
  const [mediasPreview, setMediasPreview] = useState<string[]>([])
  const [previewIndex, setPreviewIndex] = useState(0)

  const [uploadOptions, setUploadOptions] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const [loading, setLoading] = useState(false)

  const warn = useWarn()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return;
    setLoading(true)

    groupService.messages.create({ to: group_id, text: message, medias })
      .then(() => {
        setMessage("")
        clearMedias()
      })
      .catch(error => warn.error(error))
      .then(() => setLoading(false))
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

  function removeMedia(index: number) {
    setMedias(medias.filter((_, i) => i !== index))
    setMediasPreview(mediasPreview.filter((_, i) => i !== index))

    medias.length === 0 ? clearMedias() : null;
  }

  function clearMedias() {
    setMediaType(undefined)
    setMedias([])
    setMediasPreview([])
    setPreviewIndex(0)
  }

  function previewImages() {
    const previous = () => previewIndex === 0 ? setPreviewIndex(mediasPreview.length - 1) : setPreviewIndex(previewIndex - 1)
    const next = () => previewIndex === mediasPreview.length - 1 ? setPreviewIndex(0) : setPreviewIndex(previewIndex + 1)
    const remove = () => {
      previewIndex !== medias.length - 2 ? next() : null
      removeMedia(previewIndex)
    }

    return (
      <>
        <button type="button" className="remove__media" onClick={remove}>
          <FiTrash2 />
        </button>

        {mediasPreview.length > 1 ? (
          <button type="button" className="previous" onClick={previous}>
            <FiChevronLeft />
          </button>
        ) : null}

        <ImageContainer>
          <Image src={mediasPreview[previewIndex] || ""} alt="" layout="fill" />
        </ImageContainer>

        {mediasPreview.length > 1 ? (
          <button type="button" className="next" onClick={next}>
            <FiChevronRight />
          </button>
        ) : null}
      </>
    )
  }

  function previewFiles() {
    return (
      <FilesContainer>
        {medias.map((m, i) => (
          <FileBox key={m.name}>
            <span className="extension">
              {m.type.split("/")[1]}

              <span onClick={() => removeMedia(i)}>
                <FiX />
              </span>
            </span>

            <span className="name">
              <a href={mediasPreview[i]} rel="noopener noreferrer external nofollow" target={"_blank"}>{m.name}</a>
            </span>
          </FileBox>
        ))}
      </FilesContainer>
    )
  }

  function renderMediasPreview() {
    return (
      <PreviewMediasContainer>
        <PreviewMediasContent>
          <PreviewMediasInner>
            {mediaType === "image" ? (
              previewImages()
            ) : mediaType === "application" ? (
              previewFiles()
            ) : mediaType === "audio" ? (
              <AudioWrapper>
                <AudioPlayer src={mediasPreview[0]} />
              </AudioWrapper>
            ) : mediaType === "video" ? (
              <video src={mediasPreview[0]} controls />
            ) : null}

          </PreviewMediasInner>

          <PreviewMediasForm>
            <div className="input__wrapper">
              <Input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                autoComplete="off"
                onFocus={() => {
                  setShowEmojiPicker(false)
                  setUploadOptions(false)
                }}
                placeholder={mediaType === "audio" ? "Você não pode digitar uma mensagem em um aúdio" : "Digite alguma coisa..."}
                disabled={mediaType === "audio"}
              />

              <Submit type="submit">
                {!loading ? (
                  <FiSend />
                ) : (
                  <Image src="/images/loading-light.svg" width="15px" height="15px" alt="loading" />
                )}
              </Submit>
            </div>

            <button className="cancel" type="button" onClick={clearMedias}>
              <FiX />
            </button>
          </PreviewMediasForm>
        </PreviewMediasContent>
      </PreviewMediasContainer>
    )
  }

  return (
    <Container onSubmit={handleSubmit}>
      <AudioRecorder
        record={record}
        stop={() => setRecord(false)}
        setMedias={setMedias}
        setMediasPreview={setMediasPreview}
        setMediaType={setMediaType}
      />

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

      <Icon type="button" onClick={() => setRecord(true)}>
        <FiMic />
      </Icon>
    </Container>
  )
}