import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'


import { Product } from '../../../@types/Product'
import { Tenant } from '../../../@types/Tenant'
import { Button } from '../../../components/Button'
import { Header } from '../../../components/Header'
import { Quantity } from '../../../components/Quantity'
import { useAppContext } from '../../../contexts/app'
import { useApi } from '../../../libs/useApi'
import { useFormatter } from '../../../libs/useFormatter'

const Product = (data: Props) => {
  const { tenant, setTenant } = useAppContext();
  const [qtCount, setQtCount] = useState(1);

  const formatter = useFormatter();

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  const handleAddToCart = () => {

  }

  const handleUpdateQuantity = (newCount: number) => {
    setQtCount(newCount);
  }

  return (
    <div className="bg-white">
      <Head>{data.product.name} | {data.tenant.name}</Head>

      <div className="absolute headerArea left-6 right-6 top-16">
        <Header
          color={data.tenant.mainColor}
          backButton={`/${data.tenant.slug}`}
          title="Produto"
          invertColor
        />
      </div>

      <div
        className="h-[350px] bg-[#333] bg-product-bg bg-center bg-no-repeat"
        style={{ backgroundColor: data.tenant.mainColor }}
      ></div>

      <div className="-mt-[240px] text-center">
        <img className="h-[350px] w-auto" src={data.product.image} alt="Imagem do produto" />
      </div>

      <div className="mx-6 text-base font-medium text-gray-900">
        {data.product.category}
      </div>
      <div
        className="relative pb-6 mx-6 text-4xl font-semibold text-gray-900 border-b-[2px] w-fit"
        style={{ borderBottomColor: data.tenant.mainColor }}
      >
        {data.product.name}
      </div>
      <div className="border-t border-gray-300 -mt-[1.5px] mx-6"></div>
      <div className="m-6 text-base font-normal leading-6 text-gray-600">{data.product.description}</div>
      <div className="mx-6 mb-4 text-base font-normal text-gray-900">Quantidade</div>
      <div className="flex items-center mx-6 area">
        <div className="areaLeft">
          <Quantity
            color={data.tenant.mainColor}
            count={qtCount}
            onUpdateCount={handleUpdateQuantity}
            min={1}
          />
        </div>
        <div
          className="flex-1 text-right areaRight font-semibold text-[40px]"
          style={{ color: data.tenant.mainColor }}
        >
          {formatter.formatPrice(data.product.price)}
        </div>
      </div>
      <div className="mx-6 my-12 cursor-pointer">
        <Button
          color={data.tenant.mainColor}
          label="Adicionar à sacola"
          onClick={handleAddToCart}
          fill
        />
      </div>
    </div>
  )
}

export default Product

interface Props {
  tenant: Tenant,
  product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, id } = context.query
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
  const product = await api.getProduct(id as string);


  return {
    props: { tenant, product },
  }
}
