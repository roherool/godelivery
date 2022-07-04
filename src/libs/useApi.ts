import { Tenant } from "../@types/Tenant";

export const useApi = () => ({
  getTenant: (tenantSlug: string): boolean | Tenant => {
    switch (tenantSlug) {
      case "godelivery":
        return {
          slug: "godelivery",
          name: "GoDelivery",
          mainColor: "#FB9400",
          secondColor: "#00FF00",
        };
        break;

      case "goburger":
        return {
          slug: "goburger",
          name: "GoBurger",
          mainColor: "#FF0000",
          secondColor: "#b78488",
        };
        break;

      default:
        return false;
    }
  },
});
