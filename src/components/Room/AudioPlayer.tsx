import { useState, useRef, useEffect } from "react"
import { convertSeconds } from "~/helpers/time"

import {
  Container,
  PlayPauseButton,
  RangeContainer,
  ProgressBar,
  Time,
  SpeedButton,
} from "~/styles/components/Room/AudioPlayer"
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
    if (audioPlayer.current) {
      audioPlayer.current.ondurationchange = () => {
        const seconds = Math.floor(audioPlayer.current?.duration || 0)
        setDuration(seconds)
        progressBar.current!.max = `${seconds}`
      }

      audioPlayer.current.onended = () => {
        progressBar.current!.value = "0"
        changeRange()
        changePlayerCurrentTime()
        setIsPlaying(false)
      }
    }
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

  function toggleSpeed() {
    const newSpeed = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1
    audioPlayer.current!.playbackRate = newSpeed
    setSpeed(newSpeed)
  }

  return (
    <Container>
      <audio ref={audioPlayer} src={src}></audio>

      <PlayPauseButton type="button" onClick={() => togglePlayPause()}>
        {isPlaying ? (<FaPause />) : (<FaPlay />)}
      </PlayPauseButton>

      <RangeContainer>
        <ProgressBar ref={progressBar} type="range" defaultValue={0} onChange={changeRange} />

        {duration !== Infinity ? (
          <Time>{convertSeconds(currentTime)} / {convertSeconds(duration)}</Time>
        ) : null}
      </RangeContainer>

      <SpeedButton type="button" onClick={() => toggleSpeed()}>{speed}x</SpeedButton>
    </Container>
  )
}