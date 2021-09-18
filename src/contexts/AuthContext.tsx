import { createContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { userService } from "../services/api"
import { constants } from "../constants"
import { useAppSelector } from "../hooks"

import { Loading } from "../components"

type AuthContextType = {
    isAuthenticated: boolean
    loadingAuth: boolean
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactChild }) {
    const [loadingAuth, setLoadingAuth] = useState(false)

    const user = useAppSelector(state => state.user)
    const isAuthenticated = !!user.id

    const router = useRouter()

    useEffect(() => {
        router.asPath.startsWith(constants.routes.chat.HOME) && userService.hasJwt() && !isAuthenticated ?
            userService.auth(() => setLoadingAuth(true))
                .catch((message) => router.replace(`${constants.routes.SIGN_IN}?error=${message}`))
                .then(() => setTimeout(() => { setLoadingAuth(false) }, 150))
            : null
    }, [router, isAuthenticated])

    return (
        <AuthContext.Provider value={{ isAuthenticated, loadingAuth }}>
            {loadingAuth ? (<Loading hide={loadingAuth && isAuthenticated} />) : children}
        </AuthContext.Provider>
    )
}
