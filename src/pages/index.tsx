import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
// import Tenant from './[tenant]'

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <div>
      {!session && <button onClick={() => signIn()}>Fazer Login</button>}
      {session && (
        <>
          Olá, {session.user?.name}
          <button onClick={() => signOut()}>Sair</button>
        </>
      )}
    </div>
  )
}

export default Home
