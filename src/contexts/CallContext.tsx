import { createContext, useState, useRef, useEffect } from "react"
import Peer from "simple-peer"
import { useAppDispatch, useAppSelector, useWarn } from "~/hooks"
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

const PeerVideo = ({ peer, user }: { peer: Peer.Instance, user?: CallUser }) => {
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

  const streamRef = useRef<MediaStream>()
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [error, setError] = useState<string>()

  const gridCol = peers.length + 1 === 1 ? 1 : peers.length + 1 <= 4 ? peers.length + 1 : 4;
  const gridRow = peers.length + 1 <= 4 ? 1 : peers.length + 1 <= 12 ? 2 : peers.length + 1 <= 16 ? 3 : 4;

  const dispatch = useAppDispatch()
  const warn = useWarn()

  async function callTo({ callTo, callMedia, roomId, callFormat }: CallToConstraints) {
    dispatch(CallActions.toggleCallMinimized())
    setVideoEnabled(callMedia === "video")

    let callToArray = (Array.isArray(callTo) ? callTo : [callTo]);

    if (callFormat === "group" && !callToArray.find(u => u == user.id) && roomId) {
      const gUsers = await groupService.users.index(roomId)
      gUsers
        .filter(u => u.id !== user.id)
        .forEach(gU => callToArray.push(gU.id))
    }
    callToArray = callToArray.filter(u => u !== user.id)

    const usersToCall = await new Promise((resolve: (users: Array<{ id: string, online: boolean }>) => void) =>
      socket.emit('is-online', callToArray, (u: any) => { resolve(u) }))

    callFormat === "contact" && !usersToCall[0].online ?
      setError("Contato offline, não é possível ligar para este contato!") : null

    callFormat === "group" && !usersToCall.find(u => u.online) ?
      setError("Todos os membros do grupo estão offline!") : null

    if (error) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      callMedia !== "video" ? stream.getVideoTracks().map(v => v.enabled = false) : null;

      streamRef.current = stream;
      userVideo.current!.srcObject = stream;

      const usersToCallId = usersToCall.filter(u => u.online).map(u => u.id)
      socket.emit("call:create", { to: usersToCallId, callMedia }, (callId: string) => {
        dispatch(CallActions.startCall(callId, user.id, "video"))
      })

      socket.on("call:rejected", (refuserId: string) => {
        const c = contacts.find(c => c.id === refuserId);

        if (usersToCallId.filter(id => id !== refuserId).length === 0) {
          if (callFormat === "contact") {
            leaveCall();

            warn.info(`${c?.username} recusou a chamada!`);
          } else {
            leaveCall()
            warn.info("Todos as pessoas online do grupo recusaram a chamada!")
          }
        } else {
          warn.info(`${c?.username} recusou a chamada!`);
        }
      })
      socket.on("call:user-join", userJoin(stream))
      socket.on("call:user-leave", userLeave)
      socket.on("call:end", callEnd)
    } catch (error: any) {
      console.log(error)

      switch (error.toString()) {
        case "NotReadableError: Could not start video source":
          setTimeout(() => dispatch(CallActions.finishCall()), 100)
          setTimeout(() => warn.error("Algo no seu navegador não deixa acessar à camera!"), 700)
          break;
        case "NotAllowedError: Permission denied":
          setTimeout(() => dispatch(CallActions.finishCall()), 100)
          setTimeout(() => warn.error("Permita o acesso a câmera/microfone para ligar!"), 700)
          break;
      }
    }
  }

  function answerCall() {
    setVideoEnabled(call.callMedia === "video")

    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
      call.callMedia !== "video" ? stream.getVideoTracks().map(v => v.enabled = false) : null
      streamRef.current = stream;

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

          const callUser = contacts
            .map(c => ({ id: c.id, username: c.username, picture: c.picture }))
            .find(c => c.id === uId)

          callUser ? setCallUsers(callUsers => [...callUsers, callUser])
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

      socket.on("call:end", callEnd)
    })
  }

  function rejectCall() {
    socket.emit("call:reject", { callerId: call.callerId })
    dispatch(CallActions.finishCall())
  }

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

      const newUser = contacts
        .map(c => ({ id: c.id, username: c.username, picture: c.picture }))
        .find(c => c.id === callerId)

      newUser ? setCallUsers(callUsers => [...callUsers, newUser])
        : userService.get(callerId).then(user => setCallUsers(callUsers => [...callUsers, user]))
    }
  }

  function userLeave(userId: string) {
    peersRef.current.forEach(p => p.peerId === userId ? p.peer.destroy() : null)
    peersRef.current.filter(p => p.peerId !== userId)

    setPeers(peers => peers.filter(p => p.userId !== userId))

    const callUser = callUsers.find(c => c.id === userId)
    callUser ? warn.info(`${callUser.username} saiu da ligação!`) : null

    setCallUsers(callUsers => callUsers.filter(c => c.id !== userId))
  }

  function leaveCall() {
    socket.emit("call:leave", call.callId)

    setError(undefined)
    setAudioEnabled(true)
    setVideoEnabled(false)

    peers.forEach(p => p.peer.destroy())
    setPeers([])
    peersRef.current = []
    setCallUsers([])

    socket.off("call:users")
    socket.off("call:user-join")
    socket.off("call:user-leave")
    socket.off("call:returned-signal")
    socket.off("call:rejected")
    socket.off("call:end")

    streamRef.current?.getAudioTracks()
      .forEach(audioTrack => audioTrack.stop())

    streamRef.current?.getVideoTracks()
      .forEach(videoTrack => videoTrack.stop())

    dispatch(CallActions.finishCall())
  }

  function callEnd() {
    leaveCall()
    warn.info("Chamada encerrada!")
  }

  function toggleMicStatus() {
    if (streamRef.current) {
      const enabled = streamRef.current.getAudioTracks()[0].enabled;

      streamRef.current.getAudioTracks()[0].enabled = !enabled;
      setAudioEnabled(!enabled);

      updateMediaStatus()
    }
  };

  function toggleVideoStatus() {
    if (streamRef.current) {
      const enabled = streamRef.current.getVideoTracks()[0].enabled;

      streamRef.current.getVideoTracks()[0].enabled = !enabled;
      setVideoEnabled(!enabled);

      updateMediaStatus()
    }
  };

  function updateMediaStatus(peer?: Peer.Instance) {
    const audio = streamRef.current?.getAudioTracks()[0]?.enabled || false;
    const video = streamRef.current?.getVideoTracks()[0]?.enabled || false;

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

            <button type="button" className="close" onClick={leaveCall}>
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

              <button type="button" className="reject" onClick={rejectCall}>
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
                <PeerVideo user={user} key={peer.userId} peer={peer.peer} />
              )
            })}
          </Screens>

          <OptionsBar>
            <Option onClick={toggleVideoStatus}>
              {videoEnabled ? (<FiVideo />) : (<FiVideoOff />)}
            </Option>

            <Option className="call__end" onClick={leaveCall}>
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
