import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { Hamburger, List } from 'phosphor-react'
import { useEffect, useState } from 'react'

import { Banner } from '../../components/Banner'
import { ProductItem } from '../../components/ProductItem'
import { SearchInput } from '../../components/SearchInput'
import { Sidebar } from '../../components/Sidebar'

import { Product } from '../../@types/Product'
import { Tenant } from '../../@types/Tenant'
import { User } from '../../@types/User'
import { useApi } from '../../libs/useApi'

import { useAppContext } from '../../contexts/app'
import { useAuthContext } from '../../contexts/auth'

const Home = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  const [products, setProducts] = useState<Product[]>(data.products);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
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
            <div className="flex mb-2 text-2xl font-medium text-neutral-800">
              Seja Bem Vindo(a)
              <Hamburger
                size={32}
                color={tenant?.mainColor}
                className="ml-2"
              />
            </div>
            <p className="text-base font-normal text-opacity-80 text-neutral-500">
              O que deseja pra hoje?
            </p>
          </div>
          <div>
            <div
              className="flex flex-col justify-between cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <List size={48} color={tenant?.mainColor} />
            </div>

            <Sidebar
              tenant={data.tenant}
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
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
  tenant: Tenant;
  products: Product[];
  token: string;
  user: User | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query
  const api = useApi(tenantSlug as string)

  // GET Tenant
  const tenant = await api.getTenant()
  if (!tenant) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  // Get Logged User
  // const token = context.req.cookies.token;
  const token = getCookie("token", context);
  const user = await api.authorizeToken(token as string);

  // GET Products
  const products = await api.getAllProducts();

  return {
    props: {
      tenant,
      products,
      user,
      token
    },
  }
}
