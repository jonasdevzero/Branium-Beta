import type { AppProps } from 'next/app'
import GlobalStyle from "../styles/global"
import Providers from "../contexts"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <GlobalStyle />
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
