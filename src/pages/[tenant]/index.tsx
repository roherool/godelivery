import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Hamburger, List } from 'phosphor-react'

import { Banner } from '../../components/Banner'
import { ProductItem } from '../../components/ProductItem'
import { SearchInput } from '../../components/SearchInput'

import { Tenant } from '../../@types/Tenant'
import { Product } from '../../@types/Product'
import { useApi } from '../../libs/useApi'
import { useAppContext } from '../../contexts/AppContext'

const Home = (data: Props) => {
  const { tenant, setTenant } = useAppContext();
  const [products, setProducts] = useState<Product[]>(data.products);

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  const handleSearch = (searchValue: string) => {
    console.log(`Você está buscando por: ${searchValue}`)
  }

  return (
    <div className="bg-white">
      <header className="bg-neutral-300 px-6 py-[50px]">
        <div
          className={`flex items-center justify-between mb-7 bg-${tenant?.mainColor}`}
        >
          <div>
            <h1 className="flex mb-2 text-2xl font-medium text-neutral-800">
              Seja Bem Vindo(a)
              <Hamburger size={32} color={tenant?.mainColor} className="ml-2" />
            </h1>
            <p className="text-base font-normal text-opacity-80 text-neutral-500">
              O que deseja pra hoje?
            </p>
          </div>
          <div>
            <div className="flex flex-col justify-between">
              <List size={48} color={tenant?.mainColor} />
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <SearchInput onSearch={handleSearch} />
        </div>
      </header>

      <Banner />

      <div className="grid grid-cols-2 gap-6 mx-6">
        {products.map((item, index) => (
          <ProductItem
            key={index}
            data={item}
          />
        ))}
      </div>
    </div>
  )
}

export default Home

interface Props {
  tenant: Tenant,
  products: Product[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query
  const api = useApi(tenantSlug as string)

  // GET Tenant
  const tenant = await api.getTenant()
  if (!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  // GET Products
  const products = await api.getAllProducts();


  return {
    props: { tenant, products },
  }
}
