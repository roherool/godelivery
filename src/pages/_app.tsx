import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'
import { Provider as AppContextProvider } from '../contexts/app'
import { Provider as AuthContextProvider } from '../contexts/auth'

import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </AppContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
