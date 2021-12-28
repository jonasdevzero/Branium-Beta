import { useEffect, useState, useRef } from "react"
import { useAppSelector } from "../../hooks"

import {
    Container,
    AnimationContainer,
    StopButton,
    Error,
} from "../../styles/components/Room/AudioRecorder"
import {
    FiStopCircle,
    FiX,
} from "react-icons/fi"

type MediaType = "image" | "application" | "audio" | "video"
interface AudioRecorderI {
    record: boolean
    stop(): void
    setMedias: React.Dispatch<React.SetStateAction<File[]>>
    setMediasPreview: React.Dispatch<React.SetStateAction<string[]>>
    setMediaType: React.Dispatch<React.SetStateAction<MediaType | undefined>>
}

export default function AudioRecorder({ record, stop, setMedias, setMediasPreview, setMediaType }: AudioRecorderI) {
    const username = useAppSelector(state => state.user.username)

    const mediaRecorder = useRef<MediaRecorder>()
    const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([])

    const [error, setError] = useState<string>()

    const audioType = "audio/webm;codecs=opus"

    useEffect(() => {
        if (record) {
            const isSupported = MediaRecorder.isTypeSupported(audioType)

            if (isSupported) {
                getAudio()
                    .then(startRecording)
                    .catch(error => setError(error.toString()))
            } else {
                setError(`Seu navegador não suporta: ${audioType}`)
            }
        }
    }, [record, startRecording])

    useEffect(() => {
        const blob = new Blob(recordedBlobs, { type: audioType })

        if (blob.size) {
            const url = URL.createObjectURL(blob)
            const file = new File(recordedBlobs, `${username}-audio-${Date.now()}`, { type: audioType })

            mediaRecorder.current?.stream.getTracks().forEach(t => t.stop())

            setMedias([file])
            setMediasPreview([url])
            setMediaType("audio")
            setRecordedBlobs([])
            stop()
        }
    }, [recordedBlobs, username, setMediaType, setMedias, setMediasPreview, stop])

    async function getAudio() {
        return navigator.mediaDevices.getUserMedia({ audio: true })
    }

    function startRecording(audioStream: MediaStream) {
        mediaRecorder.current = new MediaRecorder(audioStream)

        mediaRecorder.current.onstop = (event) => { }

        mediaRecorder.current.ondataavailable = (event) => {
            if (!event.data || !event.data.size) return;

            setRecordedBlobs([...recordedBlobs, event.data])
        }

        mediaRecorder.current.start()
    }

    function stopRecording() {
        if (mediaRecorder.current?.state === "inactive") return;

        mediaRecorder.current?.stop()
    }

    return record ? (
        <Container>
            {!!mediaRecorder.current ? (
                <>
                    <AnimationContainer>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </AnimationContainer>

                    <StopButton type="button" onClick={stopRecording}>
                        <FiStopCircle />
                    </StopButton>
                </>
            ) : null}

            {error ? (
                <>
                    <Error>{error}</Error>

                    <StopButton type="button" onClick={stop}>
                        <FiX />
                    </StopButton>
                </>
            ) : null}
        </Container>
    ) : null
}
