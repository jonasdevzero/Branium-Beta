import { useEffect, useState, useRef } from "react"
import { AudioPlayer } from ".."
import { useAppSelector } from "../../hooks"

import {
    Container,
} from "../../styles/components/Room/AudioRecorder"

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
                    .catch(error => setError(error))
            } else {
                setError(`Seu navegador não suporta: ${audioType}`)
            }
        }
    }, [record])

    useEffect(() => {
        const blob = new Blob(recordedBlobs, { type: audioType })
        if (blob.size) {
            const url = URL.createObjectURL(blob)
            const filename = `${username}-audio-${Date.now()}`
            const file = new File(recordedBlobs, filename, { type: audioType })

            mediaRecorder.current?.stream.getTracks().forEach(t => t.stop())
            setMedias([file])
            setMediasPreview([url])
            setMediaType("audio")
            setRecordedBlobs([])
            stop()
        }
    }, [recordedBlobs, username])

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
            <h1>Record audio</h1>

            <button type="button" onClick={stopRecording}>Stop</button>
        </Container>
    ) : null
}
