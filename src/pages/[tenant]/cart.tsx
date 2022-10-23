import { getCookie, setCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { CartItem } from '../../@types/CartItem'
import { Tenant } from '../../@types/Tenant'
import { User } from '../../@types/User'

import { useApi } from '../../libs/useApi'
import { useFormatter } from '../../libs/useFormatter'

import { Button } from '../../components/Button'
import { CartProductItem } from '../../components/CartProductItem'
import { Header } from '../../components/Header'
import { InputField } from '../../components/InputField'

import { CartCookie } from '../../@types/CartCookie'
import { useAppContext } from '../../contexts/app'
import { useAuthContext } from '../../contexts/auth'

const Cart = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
  }, [])

  const formatter = useFormatter();
  const router = useRouter();

  // Product Control
  const [cart, setCart] = useState<CartItem[]>(data.cart);
  const handleCartChange = (newCount: number, id: number) => {
    const tmpCart: CartItem[] = [...cart];
    const cartIndex = tmpCart.findIndex(item => item.product.id === id);
    if (newCount > 0) {
      tmpCart[cartIndex].qt = newCount;
    } else {
      delete tmpCart[cartIndex];
    }
    let newCart: CartItem[] = tmpCart.filter(item => item);
    setCart(newCart);

    // update cookie
    let cartCookie: CartCookie[] = [];
    for (let i in newCart) {
      cartCookie.push({
        id: newCart[i].product.id,
        qt: newCart[i].qt
      });
    }
    setCookie('cart', JSON.stringify(cartCookie));
  }

  // Shipping Control
  const [shippingInput, setShippingInput] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingTime, setShippingTime] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const handleShippingCalc = () => {
    setShippingAddress('Rua bla bla bla');
    setShippingTime(20);
    setShippingPrice(9.50);
  }

  // Resume Control
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    let sub = 0;
    for (let i in cart) {
      sub += cart[i].product.price * cart[i].qt;
    }
    setSubtotal(sub);
  }, [cart]);

  const handleFinish = () => {
    router.push(`/${data.tenant.slug}/checkout`);
  }

  return (
    <div className="px-6 py-12">
      <Head>
        <title>Sacola | {data.tenant.name}</title>
      </Head>

      <Header
        backButton={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title="Sacola"
      />

      <div className="py-5 text-base font-normal border-t-2 border-b-2 border-solid products-quantity border-gray-300/50 text-neutral-900">
        {cart.length} {cart.length === 1 ? 'item' : 'itens'}
      </div>

      <div className="products-list">
        {cart.map((cartItem, index) => (
          <CartProductItem
            key={index}
            color={data.tenant.mainColor}
            quantity={cartItem.qt}
            product={cartItem.product}
            onChange={handleCartChange}
          />
        ))}
      </div>

      <div className="mt-8 shipping-area">
        <div className="mb-4 text-base font-normal text-gray-900/50 shipping-title">Calcular frete e prazo</div>
        <div className="flex gap-4 shipping-form">
          <InputField
            color={data.tenant.mainColor}
            placeholder="Digite seu frete"
            value={shippingInput}
            onChange={newValue => setShippingInput(newValue)}
          />
          <Button
            color={data.tenant.mainColor}
            label="OK"
            onClick={handleShippingCalc}
          />
        </div>

        {shippingTime > 0 &&
          <div className="px-8 py-6 mt-4 bg-gray-100 shipping-info">
            <div className="shipping-address text-xs font-normal text-[#6a7d8d] mt-4">
              {shippingAddress}
            </div>
            <div className="flex justify-between shipping-time">
              <div className="text-base font-normal text-gray-900 shipping-time-text">
                Receba em até {shippingTime} minutos
              </div>
              <div
                className="text-base font-semibold shipping-price"
                style={{ color: data.tenant.mainColor }}
              >
                {formatter.formatPrice(shippingPrice)}
              </div>
            </div>
          </div>
        }
      </div>

      <div className="px-8 py-12 mt-4 bg-gray-100 rounded-lg resume-area">
        <div className="flex justify-between mb-6 resume-item">
          <div className="text-base font-normal resume-left text-neutral-900">Subtotal</div>
          <div className="text-base font-medium resume-right text-neutral-900">
            {formatter.formatPrice(subtotal)}
          </div>
        </div>

        <div className="flex justify-between mb-6 resume-item">
          <div className="text-base font-normal resume-left text-neutral-900">Frete</div>
          <div className="text-base font-medium resume-right text-neutral-900">
            {shippingPrice > 0 ? formatter.formatPrice(shippingPrice) : '--'}
          </div>
        </div>

        <div className="border-t border-dashed resume-line border-neutral-400 mb-7"></div>

        <div className="flex justify-between mb-6 resume-item">
          <div className="text-base font-normal resume-left text-neutral-900">Total</div>
          <div
            className="text-2xl font-semibold resume-right-big text-neutral-900"
            style={{ color: data.tenant.mainColor }}
          >
            {formatter.formatPrice(shippingPrice + subtotal)}
          </div>
        </div>

        <div className="mt-10 resume-button">
          <Button
            color={data.tenant.mainColor}
            label="Continuar"
            onClick={handleFinish}
            fill
          />
        </div>
      </div>
    </div>
  )
}

export default Cart

interface Props {
  tenant: Tenant;
  token: string;
  user: User | null;
  cart: CartItem[];
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

  // GET Logged User
  // const token = context.req.cookies.token;
  const token = getCookie("token", context);
  const user = await api.authorizeToken(token as string);

  // GET Cart Products
  const cartCookie = getCookie("cart", context);
  const cart = await api.getCartProducts(cartCookie as string);

  return {
    props: {
      tenant,
      user,
      token,
      cart
    },
  }
}
