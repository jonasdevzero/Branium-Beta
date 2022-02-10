import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { WarnProvider } from "./WarnContext"
import { AuthProvider } from "./AuthContext"
import { CallProvider } from "./CallContext"
import store, { persistor } from "../store"

export default function Contexts({ children }: { children: React.ReactChild }) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WarnProvider>
          <AuthProvider>
            <CallProvider>
              {children}
            </CallProvider>
          </AuthProvider>
        </WarnProvider>
      </PersistGate>
    </ReduxProvider>
  )
}
