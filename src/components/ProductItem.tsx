import Link from "next/link";
import { Product } from "../@types/Product";

interface Props {
  data: Product;
}

export function ProductItem({ data }: Props) {
  return (
    <Link href={`/godelivery/product/${data.id}`}>
      <a className="block overflow-hidden bg-orange-100 rounded shadow-md">
        <div className="h-[90px]"></div>
        <div className="p-3">
          <div className="items-center -mt-[90px]">
            <img src={data.image} alt="" className="w-full h-auto" />
          </div>
          <span className="text-xs font-bold text-opacity-50 text-neutral-800">
            {data.category}
          </span>
          <h1 className="text-lg font-bold text-neutral-700">{data.name}</h1>
          <span className="text-sm font-semibold text-orange-400">
            R$ {data.price}
          </span>
        </div>
      </a>
    </Link>
  );
}
