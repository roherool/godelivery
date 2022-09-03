import { Product } from '../@types/Product'
import { User } from '../@types/User'

const TEMPORARYonePRODUCT: Product = {
  id: 1,
  name: "Texas Burger",
  description: "2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal",
  price: 25.50,
  image: "/assets/burger.png",
  category: "Tradicional"
}

export const useApi = (tenantSlug?: string) => ({
  getTenant: async () => {
    switch (tenantSlug) {
      case 'godelivery':
        return {
          slug: 'godelivery',
          name: 'GoDelivery',
          mainColor: '#FB9400',
          secondColor: '#FFF9F2',
        }

      case 'goburger':
        return {
          slug: 'gopizza',
          name: 'GoPizza',
          mainColor: '#6AB70A',
          secondColor: '#E0E0E0',
        }

      default:
        return false
    }
  },

  getAllProducts: async () => {
    let products = [];
    for (let q = 0; q < 10; q++) {
      products.push(TEMPORARYonePRODUCT)
    }
    return products;
  },

  getProduct: async (id: string) => {
    return TEMPORARYonePRODUCT
  },

  authorizeToken: async (token: string): Promise<User | false> => {
    if (!token) return false;

    return {
      name: "Roberto",
      email: "roherool@hotmail.com"
    }
  }
})
