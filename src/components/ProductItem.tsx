import Link from 'next/link'
import { Product } from '../@types/Product'

import { useAppContext } from '../contexts/AppContext'
import { useFormatter } from '../libs/useFormatter'

interface Props {
  data: Product
}

export function ProductItem({ data }: Props) {
  const { tenant } = useAppContext()
  const format = useFormatter()

  return (
    <Link href={`/${tenant?.slug}/product/${data.id}`}>
      <a
        className="block overflow-hidden rounded shadow-md"
        color={tenant?.mainColor}
      >
        <div
          className="h-[90px]"
          style={{ backgroundColor: tenant?.secondColor }}
        ></div>
        <div className="p-3">
          <div className="items-center -mt-[90px]">
            <img src={data.image} alt="" className="w-full h-auto" />
          </div>
          <span className="text-xs font-bold text-opacity-50 text-neutral-800">
            {data.category}
          </span>
          <h1 className="text-lg font-bold text-neutral-700">{data.name}</h1>
          <span
            className="text-sm font-semibold"
            style={{ color: tenant?.mainColor }}
          >
            {format.formatPrice(data.price)}
          </span>
        </div>
      </a>
    </Link>
  )
}
