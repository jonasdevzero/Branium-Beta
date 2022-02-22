import { createContext, useState } from "react"
import Peer from "simple-peer"
import { CallContextType } from "../types/contexts"

import {
  Container,
  Header,
  Close,
  Card,
} from "../styles/components/Call"
import {
  FiX
} from "react-icons/fi"

export const CallContext = createContext({} as CallContextType)

export function CallProvider({ children }: { children: React.ReactChild }) {
  const [minimized, setMinimized] = useState(true);

  const [myStream, setMyStream] = useState<MediaStream>();

  function callTo() {
    setMinimized(false)
  }

  return (
    <CallContext.Provider value={{ inCall: false, callTo }}>
      {children}
      {!minimized ? (
        <Container>
          <Header>
            <Close onClick={() => setMinimized(true)}>
              <FiX />
            </Close>
          </Header>

          <Card>
            <h1>Em Desenvolvimento :)</h1>
            <h2>Sim! será possível ligar!</h2>
          </Card>
        </Container>
      ) : null}
    </CallContext.Provider>
  )
}
