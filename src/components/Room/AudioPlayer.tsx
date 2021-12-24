import { useState, useRef, useEffect } from "react"

import {
    Container,
    PlayPauseButton,
    RangeContainer,
    ProgressBar,
    Time,
    SpeedButton,
} from "../../styles/components/AudioPlayer"
import {
    FaPause,
    FaPlay,
} from "react-icons/fa"

export default function AudioPlayer({ src }: { src: string }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [speed, setSpeed] = useState(1)

    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const audioPlayer = useRef<HTMLAudioElement>(null)
    const progressBar = useRef<HTMLInputElement>(null)
    const animationRef = useRef<any>()

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current?.duration || 0)

        setDuration(seconds)

        progressBar.current!.max = `${seconds}`
    }, [audioPlayer.current?.readyState])

    function togglePlayPause() {
        if (isPlaying) {
            audioPlayer.current?.pause()
            cancelAnimationFrame(animationRef.current)
        } else {
            audioPlayer.current?.play()
            animationRef.current = requestAnimationFrame(whilePlaying)
        }

        setIsPlaying(!isPlaying)
    }

    function whilePlaying() {
        if (progressBar.current && audioPlayer.current) {
            progressBar.current.value = audioPlayer.current.currentTime?.toString()
            changePlayerCurrentTime()
            animationRef.current = requestAnimationFrame(whilePlaying)
        }
    }

    function changeRange() {
        if (audioPlayer.current && progressBar.current) {
            audioPlayer.current.currentTime = Number(progressBar.current.value)
            changePlayerCurrentTime()
        }
    }

    function changePlayerCurrentTime() {
        if (audioPlayer.current && progressBar.current) {
            const progressBarValue = Number(progressBar.current.value)

            progressBar.current.style.setProperty("--seek-before-width", `${progressBarValue / duration * 100}%`)
            setCurrentTime(progressBarValue)
        }
    }

    function calculateTime(secs: number) {
        const minutes = Math.floor(secs / 60)
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`

        const seconds = Math.floor(secs % 60)
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

        return `${returnedMinutes}:${returnedSeconds}`
    }

    function toggleSpeed() {
        const newSpeed = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1
        audioPlayer.current!.playbackRate = newSpeed
        setSpeed(newSpeed)
    }

    return (
        <Container>
            <audio ref={audioPlayer} src={src}></audio>

            <PlayPauseButton onClick={() => togglePlayPause()}>
                {isPlaying ? (<FaPause />) : (<FaPlay />)}
            </PlayPauseButton>

            <RangeContainer>
                <ProgressBar ref={progressBar} type="range" defaultValue={0} onChange={changeRange} />

                <Time>{calculateTime(currentTime)} / {calculateTime(duration)}</Time>
            </RangeContainer>

            <SpeedButton onClick={() => toggleSpeed()}>{speed}x</SpeedButton>
        </Container>
    )
}