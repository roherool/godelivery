import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import { Provider as AppContextProvider } from '../contexts/app'
import { Provider as AuthContextProvider } from '../contexts/auth'

import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AuthContextProvider>
      <SessionProvider session={session}>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </SessionProvider>
    </AuthContextProvider>
  )
}

export default MyApp
