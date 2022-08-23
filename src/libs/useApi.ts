import { Product } from '../@types/Product'
import { Tenant } from '../@types/Tenant'

const TEMPORARYonePRODUCT: Product = {
  id: 1,
  name: "Texas Burger",
  description: "2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal",
  price: 25.50,
  image: "/assets/burger.png",
  category: "Tradicional"
}

export const useApi = (tenantSlug: string) => ({
  getTenant: async () => {
    switch (tenantSlug) {
      case 'godelivery':
        return {
          slug: 'godelivery',
          name: 'GoDelivery',
          mainColor: '#FB9400',
          secondColor: '#DB9400',
        }

      case 'goburger':
        return {
          slug: 'goburger',
          name: 'GoBurger',
          mainColor: '#000000',
          secondColor: '#b78488',
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
  }
})
