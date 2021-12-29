import { useEffect, useState, useRef, useCallback } from "react"
import { useAppSelector } from "../../hooks"
import { convertSeconds } from "../../utils/time"

import {
    Container,
    AnimationContainer,
    Time,
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
    const [recordingTime, setRecordingTime] = useState(0)
    const [recording, setRecording] = useState(false)

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
    }, [record])

    useEffect(() => {
        const blob = new Blob(recordedBlobs, { type: audioType })

        if (blob.size) {
            const url = URL.createObjectURL(blob)
            const file = new File(recordedBlobs, `${username}-audio-${Date.now()}`, { type: audioType })

            mediaRecorder.current?.stream.getAudioTracks().forEach(t => t.stop())
            setMedias([file])
            setMediasPreview([url])
            setMediaType("audio")
            setRecordedBlobs([])
            stop()
        }
    }, [recordedBlobs, username, setMediaType, setMedias, setMediasPreview])

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        if (recording) {
            timeout = setTimeout(() => {
                setRecordingTime(seconds => seconds + 1);
            }, 1000);
        } else if (!recording && recordingTime !== 0) {
            setRecordingTime(0)
            timeout ? clearTimeout(timeout) : null;
        }

        return () => {
            timeout ? clearTimeout(timeout) : null
        }
    }, [recordingTime, recording])

    async function getAudio() {
        return navigator.mediaDevices.getUserMedia({ audio: true })
    }

    const startRecording = useCallback((audioStream: MediaStream) => {
        mediaRecorder.current = new MediaRecorder(audioStream)

        mediaRecorder.current.onstop = (event) => { }

        mediaRecorder.current.ondataavailable = (event) => {
            if (!event.data || !event.data.size) return;

            setRecordedBlobs([...recordedBlobs, event.data])
        }

        mediaRecorder.current.start()
        setRecording(true)
    }, [])

    const stopRecording = useCallback(() => {
        if (mediaRecorder.current?.state === "inactive") return;

        mediaRecorder.current?.stop()
        setRecording(false)
    }, [])

    return record ? (
        <Container>
            {recording ? (
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

                    {recordingTime ? (
                        <Time>{convertSeconds(recordingTime)}</Time>
                    ) : null}

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
