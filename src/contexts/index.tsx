import { Provider as ReduxProvider } from "react-redux"
import { WarnProvider } from "./WarnContext"
import { AuthProvider } from "./AuthContext"
import store from "../store"

export default function Contexts({ children }: { children: React.ReactChild[] }) {
    return (
        <ReduxProvider store={store}>
            <WarnProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </WarnProvider>
        </ReduxProvider>
    )
}
