import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Tenant } from '../../@types/Tenant'
import { useApi } from '../../libs/useApi'
import { useAppContext } from '../../contexts/AppContext'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Icon } from '../../components/Icon'

const ForgetSuccess = (data: Props) => {
  const { tenant, setTenant } = useAppContext()

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  const router = useRouter()

  const handleSubmit = () => {
    router.push(`/${data.tenant.slug}/login`)
  }

  return (
    <div className="px-6 py-12 bg-white">
      <Head>
        <title>Esqueci a senha | {data.tenant.name}</title>
      </Head>

      <Header
        color={data.tenant.mainColor}
        backButton={`/${data.tenant.slug}/forget`}
      />

      <div className="flex justify-center mx-auto mt-24 mb-12">
        <Icon
          icon="mailSent"
          color={data.tenant.mainColor}
          width={99}
          height={81}
        />
      </div>

      <div className="mb-8 text-2xl font-semibold text-center">
        Verifique seu e-mail
      </div>

      <div
        className="text-lg font-normal leading-5 text-center text-[rgba(27, 27, 27, 0.8)] m-auto w-[80%] relative"
      >
        Enviamos as instruções para recuperação de senha para o seu e-mail.
      </div>

      <form className="mt-10">
        <div className="mb-8">
          <Button
            color={data.tenant.mainColor}
            label="Fazer Login"
            onClick={handleSubmit}
            fill
          />
        </div>
      </form>
    </div>
  )
}

export default ForgetSuccess

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
