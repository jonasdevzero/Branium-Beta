import { createContext, useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { userService } from "../services/api"
import { constant } from "../constant"
import { useAppSelector } from "../hooks"
import { AuthContextType } from "../types/contexts"

import { Loading } from "../components"
export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactChild }) {
    const [loadingAuth, setLoadingAuth] = useState(false)

    const userId = useAppSelector(state => state.user.id)
    const isAuthenticated = !!userId

    const router = useRouter()

    useEffect(() => {
        router.asPath.startsWith(constant.routes.chat.HOME) && userService.hasJwt() && !isAuthenticated ?
            userService.auth(() => setLoadingAuth(true))
                .catch((message) => router.replace(`${constant.routes.SIGN_IN}?error=${message}`))
                .then(() => setTimeout(() => { setLoadingAuth(false) }, 150))
            : null
    }, [router, isAuthenticated])

    return (
        <AuthContext.Provider value={{ isAuthenticated, loadingAuth }}>
            {loadingAuth ? (
                <>
                    <Head>
                        <title>Branium</title>
                    </Head>

                    <Loading hide={loadingAuth && isAuthenticated} />
                </>
            ) : children}
        </AuthContext.Provider>
    )
}
