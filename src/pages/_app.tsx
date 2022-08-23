import type { AppProps } from 'next/app'

import { AppContextProvider } from '../contexts/AppContext'
import { SessionProvider } from 'next-auth/react'

import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AppContextProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </AppContextProvider>
  )
}

export default MyApp
