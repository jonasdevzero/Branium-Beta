import { Provider as ReduxProvider } from "react-redux"
import { WarnProvider } from "./WarnContext"
import { AuthProvider } from "./AuthContext"
import { CallProvider } from "./CallContext"
import store from "../store"

export default function Contexts({ children }: { children: React.ReactChild }) {
    return (
        <ReduxProvider store={store}>
            <WarnProvider>
                <AuthProvider>
                    <CallProvider>
                        {children}
                    </CallProvider>
                </AuthProvider>
            </WarnProvider>
        </ReduxProvider>
    )
}
