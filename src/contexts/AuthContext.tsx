import { createContext, useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import api, { userService } from "../services/api"
import { constant } from "../constant"
import { useAppSelector } from "../hooks"
import { AuthContextType } from "../types/contexts"
import socket from "~/services/socket"

import { Loading } from "../components"

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactChild }) {
  const [loadingAuth, setLoadingAuth] = useState(false)

  const userId = useAppSelector(state => state.user.id)
  const isAuthenticated = !!userId

  const router = useRouter()

  useEffect(() => {
    const isAuthPage = router.asPath.startsWith(constant.routes.chat.HOME);
    const hasJwt = userService.hasJwt();

    (isAuthPage && hasJwt && !isAuthenticated) ? authUser() : (isAuthPage && !hasJwt) ? rejectAuth() : null;
  }, [router, isAuthenticated])

  function authUser() {
    setLoadingAuth(true);

    userService.auth()
      .catch((message) => router.replace(`${constant.routes.SIGN_IN}?error=${message}`))
      .then(() => setTimeout(() => { setLoadingAuth(false) }, 150));
  }

  function rejectAuth() {
    setLoadingAuth(true);

    router.replace(constant.routes.SIGN_IN)
      .then(() => setLoadingAuth(false));
  }

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
