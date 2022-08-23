import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Tenant } from '../../@types/Tenant'
import { useApi } from '../../libs/useApi'
import { useAppContext } from '../../contexts/AppContext'
import { Header } from '../../components/Header'
import { InputField } from '../../components/InputField'
import { Button } from '../../components/Button'

const Forget = (data: Props) => {
  const { tenant, setTenant } = useAppContext()
  const [email, setEmail] = useState('')

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  const router = useRouter()

  const handleSubmit = () => {
    router.push(`/${data.tenant.slug}/forget-success`)
  }

  return (
    <div className="px-6 py-12 bg-white">
      <Head>
        <title>Esqueci a senha | {data.tenant.name}</title>
      </Head>

      <Header
        color={data.tenant.mainColor}
        backButton={`/${data.tenant.slug}/login`}
      />

      <div className="mt-5 mb-10 text-4xl font-bold text-center">
        {data.tenant.name}
      </div>

      <div className="mb-8 text-2xl font-semibold text-center">
        Esqueceu sua senha?
      </div>

      <div
        className="text-lg font-normal leading-5 text-center text-[rgba(27, 27, 27, 0.8)] m-auto w-[80%] pb-10 border-b-[1.5px] border-[#000] relative"
        style={{ borderBottomColor: data.tenant.mainColor }}
      >
        Preencha o campo com o seu e-mail e receba as instruções necessárias
        para redefinir a sua senha.
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
          <Button
            color={data.tenant.mainColor}
            label="Enviar"
            onClick={handleSubmit}
            fill
          />
        </div>
      </form>
    </div>
  )
}

export default Forget

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
