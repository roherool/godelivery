import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Tenant } from '../../@types/Tenant'
import { useApi } from '../../libs/useApi'
import { useAppContext } from '../../contexts/AppContext'
import { Header } from '../../components/Header'
import { InputField } from '../../components/InputField'
import { Button } from '../../components/Button'

const Login = (data: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { tenant, setTenant } = useAppContext()

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  const router = useRouter()

  const handleSubmit = () => { }

  const handleSignUp = () => {
    router.push(`/${data.tenant.slug}/signup`)
  }

  return (
    <div className="px-6 py-12 bg-white">
      <Head>
        <title>Login | {data.tenant.name}</title>
      </Head>

      <Header
        color={data.tenant.mainColor}
        backButton={`/${data.tenant.slug}`}
      />

      <div className="mt-5 mb-10 text-4xl font-bold text-center">
        {data.tenant.name}
      </div>

      <div
        className="text-lg font-normal leading-5 text-center text-[rgba(27, 27, 27, 0.8)] m-auto w-56 pb-10 border-b-[1.5px] border-[#000] relative"
        style={{ borderBottomColor: data.tenant.mainColor }}
      >
        Use suas credenciais para realizar o login.
      </div>

      <div className="border-t-[1.5px] border-[#E2E2E2] -mt-[1.5px]"></div>

      <form className="mt-14">
        <div className="mb-8">
          <InputField
            placeholder="Digite seu e-mail"
            value={email}
            onChange={setEmail}
            color={data.tenant.mainColor}
          />
        </div>

        <div className="mb-8">
          <InputField
            placeholder="Digite sua senha"
            value={password}
            onChange={setPassword}
            color={data.tenant.mainColor}
            password
          />
        </div>

        <div className="mb-8">
          <Button
            color={data.tenant.mainColor}
            label="Entrar"
            onClick={handleSubmit}
            fill
          />
        </div>
      </form>

      <div
        className="relative pb-16 m-auto text-base font-normal text-center text-black divide-black w-fit divide-solid border-b-[1.5px] border-[#000]"
        style={{ borderBottomColor: data.tenant.mainColor }}
      >
        Esqueceu sua senha?{' '}
        <Link href={`/${data.tenant.slug}/forget`}>
          <a
            className="font-semibold text-black no-underline"
            style={{ color: data.tenant.mainColor }}
          >
            Clique aqui
          </a>
        </Link>
      </div>

      <div className="mt-16">
        <Button
          color={data.tenant.mainColor}
          label="Quero me cadastrar"
          onClick={handleSignUp}
        />
      </div>
    </div>
  )
}

export default Login

interface Props {
  tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query
  const api = useApi()

  // GET Tenant
  const tenant = await api.getTenant(tenantSlug as string)
  if (!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { tenant },
  }
}
