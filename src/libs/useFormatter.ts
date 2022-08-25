
export const useFormatter = () => {
  return {
    formatPrice: (price: number) => {
      return price.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "BRL"
      })
    },

    formatQuantity: (qt: number, minDigits: number) => {
      if (qt.toString().length >= minDigits) return qt.toString();
      const remain = minDigits - qt.toString().length;
      return `${"0".repeat(remain)}${qt}`;
    }
  }
}
