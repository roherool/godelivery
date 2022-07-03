export type getTenantResponse = {
  name: string;
  mainColor: string;
  secondColor: string;
};

export const useApi = () => ({
  getTenant: (tenantSlug: string): boolean | getTenantResponse => {
    switch (tenantSlug) {
      case "godelivery":
        return {
          name: "GoDelivery",
          mainColor: "#FB9400",
          secondColor: "#00FF00",
        };
        break;

      case "goburger":
        return {
          name: "GoBurger",
          mainColor: "#0000FF",
          secondColor: "#00FF00",
        };
        break;

      default:
        return false;
    }
  },
});
