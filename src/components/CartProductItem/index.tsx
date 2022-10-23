import { Product } from "../../@types/Product";

import { useFormatter } from "../../libs/useFormatter";
import { Quantity } from "../Quantity";

interface Props {
  color: string;
  quantity: number;
  product: Product;
  onChange: (newCount: number, id: number) => void;
}

export function CartProductItem({ color, quantity, product, onChange }: Props) {
  const formatter = useFormatter();

  return (
    <div className="container flex items-center border-b-[1.5px] border-solid border-gray-300/50">
      <div className="w-[85px] product-image">
        <img className="w-full" src={product.image} alt="" />
      </div>
      <div className="flex-1 ml-5 product-info">
        <div className="text-xs font-normal product-category text-neutral-900">{product.category}</div>
        <div className="mt-1 text-base font-medium product-name text-neutral-900">{product.name}</div>
        <div
          className="text-base font-semibold leading-none product-price text-neutral-900"
          style={{ color: color }}
        >
          {formatter.formatPrice(product.price)}
        </div>
      </div>
      <div className="qt-control">
        <Quantity
          color={color}
          count={quantity}
          onUpdateCount={(newCount: number) => onChange(newCount, product.id)}
          min={0}
          small
        />
      </div>
    </div>
  );
}