import { createContext, useState, useRef, useEffect } from "react"
import Peer from "simple-peer"
import { useAppDispatch, useAppSelector } from "~/hooks"
import CallActions from "~/store/actions/CallActions"
import { CallContextType, CallToConstraints } from "../types/contexts"
import socket from "~/services/socket"
import { groupService, userService } from "~/services/api"

import { Avatar } from "~/components"
import {
  Container,
  Inner,
  Screens,
  VideoBox,
  OptionsBar,
  Option,
  Minimize,
  EventScreen,
} from "../styles/components/Call"
import {
  FiX,
  FiPhone,
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiChevronDown,
  FiPhoneMissed,
} from "react-icons/fi"

type CallUser = {
  id: string;
  username: string;
  picture: string | undefined;
}

const Video = ({ peer, user }: { peer: Peer.Instance, user?: CallUser }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [mediaState, setMediaState] = useState({ audio: false, video: false })

  useEffect(() => {
    peer.on("stream", stream => {
      ref.current!.srcObject = stream;
    })

    peer.on("data", data => {
      const parsedData = JSON.parse(new TextDecoder().decode(data))
      const [event, { audio, video }] = parsedData;

      event === "call:update-media" ? setMediaState({ audio, video }) : null;
    })
  }, []);

  return (
    <VideoBox>
      {!mediaState.video ? (
        <div className="avatar">
          <Avatar src={user?.picture} size="10vw" />
        </div>
      ) : null}

      <span className="username">{user?.username}</span>

      <span className="mic">
        {mediaState.audio ? (<FiMic />) : (<FiMicOff />)}
      </span>

      <video autoPlay ref={ref} />
    </VideoBox>
  );
}

export const CallContext = createContext({} as CallContextType)

export function CallProvider({ children }: { children: React.ReactChild }) {
  const user = useAppSelector(state => state.user)
  const contacts = useAppSelector(state => state.user.contacts)

  const call = useAppSelector(state => state.call)
  const userVideo = useRef<HTMLVideoElement>(null)
  const [peers, setPeers] = useState<Array<{ userId: string, peer: Peer.Instance }>>([])
  const peersRef = useRef<Array<{ peerId: string, peer: Peer.Instance }>>([])
  const [callUsers, setCallUsers] = useState<Array<CallUser>>([])

  const myStreamRef = useRef<MediaStream>()
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [error, setError] = useState<string>()

  const gridCol = peers.length + 1 === 1 ? 1 : peers.length + 1 <= 4 ?  peers.length + 1 : 4;
  const gridRow = peers.length + 1 <= 4 ? 1 : peers.length + 1 <= 12 ? 2 : peers.length + 1 <= 16 ? 3 : 4;

  const dispatch = useAppDispatch()

  async function callTo({ callTo, callMedia, roomId, callFormat }: CallToConstraints) {
    dispatch(CallActions.toggleCallMinimized())
    setVideoEnabled(callMedia === "video")

    const callToArray = (Array.isArray(callTo) ? callTo : [callTo]);

    if (callFormat === "group" && !callToArray.find(u => u == user.id) && roomId) {
      const gUsers = await groupService.users.index(roomId)
      gUsers
        .filter(u => u.id !== user.id)
        .forEach(gU => callToArray.push(gU.id))
    }
    callToArray.filter(u => u !== user.id)

    const [stream, usersToCall] = await Promise.all([
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }),

      // getting all users online
      new Promise((resolve: (users: Array<{ id: string, online: boolean }>) => void) =>
        socket.emit('is-online', callToArray, (u: any) => { resolve(u) })),
    ])

    callMedia !== "video" ? stream.getVideoTracks().map(v => v.enabled = false) : null

    callFormat === "contact" && !usersToCall[0].online ?
      setError("Contato offline, não é possível ligar para este contato!") : null

    callFormat === "group" && !usersToCall.find(u => u.online) ?
      setError("Todos os membros do grupo estão offline!") : null

    if (error) return;

    myStreamRef.current = stream;
    userVideo.current!.srcObject = stream;

    socket.emit("call:create", { to: usersToCall.map(u => u.id), callMedia }, (callId: string) => {
      dispatch(CallActions.startCall(callId, user.id, "video"))
    })

    socket.on("call:user-join", userJoin(stream))

    socket.on("call:user-leave", userLeave)
  }

  function answerCall() {
    setVideoEnabled(call.callMedia === "video")

    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
      call.callMedia !== "video" ? stream.getVideoTracks().map(v => v.enabled = false) : null
      myStreamRef.current = stream;

      userVideo.current!.srcObject = stream;

      dispatch(CallActions.acceptCall())

      socket.emit("call:join", call.callId)
      socket.on("call:users", (users: string[]) => {
        const peers = [] as Array<{ userId: string, peer: Peer.Instance }>;

        users.forEach(uId => {
          const peer = createPeer(uId, user.id, stream)

          peers.push({ userId: uId, peer })
          peersRef.current.push({
            peerId: uId,
            peer,
          })

          const u = contacts.find(c => c.id === uId)
          u ? setCallUsers(callUsers => [...callUsers, { id: uId, username: u.username, picture: u.picture }])
            : userService.get(uId).then(user => setCallUsers(callUsers => [...callUsers, user]))
        })

        setPeers(peers)
      })

      socket.on("call:user-join", userJoin(stream))

      socket.on("call:returned-signal", (payload: any) => {
        const peer = peersRef.current.find(p => p.peerId === payload.id)?.peer;
        peer?.signal(payload.signal)
      })

      socket.on("call:user-leave", userLeave)
    })
  }

  function rejectCall() { }

  function createPeer(userToSignal: string, callerId: string, stream: MediaStream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    })

    peer.on("signal", signal => {
      socket.emit("call:signal", { userToSignal, callerId, signal })
    })

    peer.once("connect", () => updateMediaStatus(peer))

    return peer;
  }

  function addPeer(incomingSignal: Peer.SignalData, callerId: string, stream: MediaStream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on("signal", signal => {
      socket.emit("call:answer-signal", { signal, callerId })
    })

    peer.once("connect", () => updateMediaStatus(peer))

    peer.signal(incomingSignal)

    return peer;
  }

  function userJoin(stream: MediaStream) {
    return ({ signal, callerId }: { signal: Peer.SignalData, callerId: string }) => {
      const peer = addPeer(signal, callerId, stream)
      peersRef.current.push({
        peerId: callerId,
        peer,
      })
      setPeers(peers => [...peers, { userId: callerId, peer }])

      const u = contacts.find(c => c.id === callerId)
      u ? setCallUsers(callUsers => [...callUsers, { id: callerId, username: u.username, picture: u.picture }])
        : userService.get(callerId).then(user => setCallUsers(callUsers => [...callUsers, user]))
    }
  }

  function userLeave(userId: string) {
    peersRef.current.forEach(p => p.peerId === userId ? p.peer.destroy() : null)
    peersRef.current.filter(p => p.peerId !== userId)

    setPeers(peers => peers.filter(p => p.userId !== userId))
  }

  function finishCall() {
    socket.emit("call:leave", call.callId)

    setError(undefined)
    setAudioEnabled(true)
    setVideoEnabled(false)

    peers.forEach(p => p.peer.destroy())
    setPeers([])
    peersRef.current = []

    socket.off("call:users")
    socket.off("call:user-join")
    socket.off("call:user-leave")
    socket.off("call:returned-signal")

    myStreamRef.current?.getAudioTracks()
      .forEach(audioTrack => audioTrack.stop())

    myStreamRef.current?.getVideoTracks()
      .forEach(videoTrack => videoTrack.stop())

    dispatch(CallActions.finishCall())
  }

  function toggleMicStatus() {
    if (myStreamRef.current) {
      const enabled = myStreamRef.current.getAudioTracks()[0].enabled;

      myStreamRef.current.getAudioTracks()[0].enabled = !enabled;
      setAudioEnabled(!enabled);

      updateMediaStatus()
    }
  };

  function toggleVideoStatus() {
    if (myStreamRef.current) {
      const enabled = myStreamRef.current.getVideoTracks()[0].enabled;

      myStreamRef.current.getVideoTracks()[0].enabled = !enabled;
      setVideoEnabled(!enabled);

      updateMediaStatus()
    }
  };

  function updateMediaStatus(peer?: Peer.Instance) {
    const audio = myStreamRef.current?.getAudioTracks()[0].enabled
    const video = myStreamRef.current?.getVideoTracks()[0].enabled

    const data = JSON.stringify(["call:update-media", { audio, video }])
    peer ? peer.send(data) : peersRef.current.forEach(p => p.peer.send(data))
  }

  return (
    <CallContext.Provider value={{ inCall: false, callTo }}>
      {children}
      <Container visible={!call.minimized || call.callRequest || !!error} >
        {error ? (
          <EventScreen>
            <h1>{error}</h1>

            <button type="button" className="close" onClick={finishCall}>
              <FiX />
            </button>
          </EventScreen>
        ) : null}

        {call.callRequest ? (
          <EventScreen>
            <strong>{contacts.find(c => c.id === call.callerId)?.username} está ligando</strong>

            <div className="buttons">
              <button type="button" className="accept" onClick={answerCall}>
                <FiPhone />
              </button>

              <button type="button" className="reject" onClick={answerCall}>
                <FiPhoneMissed />
              </button>
            </div>
          </EventScreen>
        ) : null}

        <Inner>
          <Screens gridCol={gridCol} gridRow={gridRow} >
            <VideoBox>
              {!videoEnabled ? (
                <div className="avatar">
                  <Avatar src={user.picture} size="15vw" />
                </div>
              ) : null}

              <span className="username">{user.username}</span>

              <span className="mic">
                {audioEnabled ? (<FiMic />) : (<FiMicOff />)}
              </span>

              <video ref={userVideo} muted autoPlay />
            </VideoBox>

            {peers.map(peer => {
              const user = callUsers.find(u => u.id === peer.userId)

              return (
                <Video user={user} key={peer.userId} peer={peer.peer} />
              )
            })}
          </Screens>

          <OptionsBar>
            <Option onClick={toggleVideoStatus}>
              {videoEnabled ? (<FiVideo />) : (<FiVideoOff />)}
            </Option>

            <Option className="call__end" onClick={finishCall}>
              <FiPhone />
            </Option>

            <Option onClick={toggleMicStatus}>
              {audioEnabled ? (<FiMic />) : (<FiMicOff />)}
            </Option>

            <Minimize onClick={() => dispatch(CallActions.toggleCallMinimized())}>
              <FiChevronDown />
            </Minimize>
          </OptionsBar>
        </Inner>
      </Container>
    </CallContext.Provider>
  )
}
