import { createContext, useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { userService } from "../services/api"
import { constant } from "../constant"
import { AuthContextType } from "../types/contexts"

import { Loading } from "../components"

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactChild }) {
  const [loadingAuth, setLoadingAuth] = useState(false)

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const isAuthPage = router.asPath.startsWith(constant.routes.chat.HOME);
    const hasJwt = userService.hasJwt();

    (isAuthPage && hasJwt && !isAuthenticated && !loadingAuth) ? authUser() : (isAuthPage && !hasJwt) ? rejectAuth() : null;
  }, [router, isAuthenticated, loadingAuth])

  function authUser() {
    setLoadingAuth(true);

    userService.auth()
      .then(() => {
        setIsAuthenticated(true)
        setTimeout(() => { setLoadingAuth(false) }, 150)
      })
      .catch((message) => router.replace(`${constant.routes.SIGN_IN}?error=${message}`));
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
