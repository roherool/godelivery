import { GetServerSideProps } from "next";
import { Hamburger, List } from "phosphor-react";

import { Banner } from "../../components/Banner";
import { ProductItem } from "../../components/ProductItem";
import { SearchInput } from "../../components/SearchInput";

import { getTenantResponse, useApi } from "../../libs/useApi";

const Tenant = (data: Props) => {
  const api = useApi();
  const tenant = api.getTenant("godelivery");

  if (!tenant) {
    // direct
  }

  const handleSearch = (searchValue: string) => {
    console.log(`Você está buscando por: ${searchValue}`);
  };

  return (
    <div className="bg-white">
      <header className="bg-neutral-300 px-6 py-[50px]">
        <div
          className={`flex items-center justify-between mb-7 bg-${data.tenant.mainColor}`}
        >
          <div>
            <h1 className="flex mb-2 text-2xl font-medium text-neutral-800">
              Seja Bem Vindo(a)
              <Hamburger size={32} color="#FB9400" className="ml-2" />
            </h1>
            <p className="text-base font-normal text-opacity-80 text-neutral-500">
              O que deseja pra hoje?
            </p>
          </div>
          <div>
            <div className="flex flex-col justify-between">
              <List size={48} color={data.tenant.mainColor} />
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <SearchInput
            onSearch={handleSearch}
            mainColor={data.tenant.mainColor}
          />
        </div>
      </header>
      <Banner />

      <div className="grid grid-cols-2 gap-6 mx-6">
        <ProductItem
          data={{
            id: "1",
            image: "/assets/burger.png",
            category: "Tradicional",
            name: "Texas Burger",
            price: "25,50",
          }}
          mainColor={data.tenant.mainColor}
          secondColor={data.tenant.secondColor}
        />
        <ProductItem
          data={{
            id: "2",
            image: "/assets/burger.png",
            category: "Tradicional",
            name: "Texas Burger",
            price: "25,50",
          }}
          mainColor={data.tenant.mainColor}
          secondColor={data.tenant.secondColor}
        />
        <ProductItem
          data={{
            id: "3",
            image: "/assets/burger.png",
            category: "Tradicional",
            name: "Texas Burger",
            price: "25,50",
          }}
          mainColor={data.tenant.mainColor}
          secondColor={data.tenant.secondColor}
        />
        <ProductItem
          data={{
            id: "4",
            image: "/assets/burger.png",
            category: "Tradicional",
            name: "Texas Burger",
            price: "25,50",
          }}
          mainColor={data.tenant.mainColor}
          secondColor={data.tenant.secondColor}
        />
        <ProductItem
          data={{
            id: "5",
            image: "/assets/burger.png",
            category: "Tradicional",
            name: "Texas Burger",
            price: "25,50",
          }}
          mainColor={data.tenant.mainColor}
          secondColor={data.tenant.secondColor}
        />
        <ProductItem
          data={{
            id: "6",
            image: "/assets/burger.png",
            category: "Tradicional",
            name: "Texas Burger",
            price: "25,50",
          }}
          mainColor={data.tenant.mainColor}
          secondColor={data.tenant.secondColor}
        />
        <ProductItem
          data={{
            id: "7",
            image: "/assets/burger.png",
            category: "Tradicional",
            name: "Texas Burger",
            price: "25,50",
          }}
          mainColor={data.tenant.mainColor}
          secondColor={data.tenant.secondColor}
        />
      </div>
    </div>
  );
};

export default Tenant;

interface Props {
  tenant: getTenantResponse;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi();

  //GET Tenant
  const tenant = await api.getTenant(tenantSlug as string);
  if (!tenant) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { tenant },
  };
};
