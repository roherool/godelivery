import { Hamburger, List } from "phosphor-react";

import { Banner } from "../../components/Banner";
import { ProductItem } from "../../components/ProductItem";
import { SearchInput } from "../../components/SearchInput";

const Tenant = () => {
  const handleSearch = (searchValue: string) => {
    console.log(`Você está buscando por: ${searchValue}`);
  };

  return (
    <div className="bg-white">
      <header className="bg-neutral-300 px-6 py-[50px]">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="flex mb-2 text-2xl font-medium text-neutral-800">
              Seja Bem Vindo(a)
              <Hamburger size={32} color="#FB9400" className="ml-2" />
            </h1>
            <p className="text-base font-normal text-opacity-80 text-neutral-500">
              O que deseja pra hoje?
            </p>
          </div>
          <div className="header-top-right">
            <div className="flex flex-col justify-between h-4 w-[18px]">
              <List size={32} color="#FB9400" />
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <SearchInput onSearch={handleSearch} />
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
        />
        <ProductItem
          data={{
            id: "2",
            image: "/assets/burger.png",
            category: "Tradicional",
            name: "Texas Burger",
            price: "25,50",
          }}
        />
        <ProductItem
          data={{
            id: "3",
            image: "/assets/burger.png",
            category: "Tradicional",
            name: "Texas Burger",
            price: "25,50",
          }}
        />
        <ProductItem
          data={{
            id: "4",
            image: "/assets/burger.png",
            category: "Tradicional",
            name: "Texas Burger",
            price: "25,50",
          }}
        />
        <ProductItem
          data={{
            id: "5",
            image: "/assets/burger.png",
            category: "Tradicional",
            name: "Texas Burger",
            price: "25,50",
          }}
        />
        <ProductItem
          data={{
            id: "6",
            image: "/assets/burger.png",
            category: "Tradicional",
            name: "Texas Burger",
            price: "25,50",
          }}
        />
        <ProductItem
          data={{
            id: "7",
            image: "/assets/burger.png",
            category: "Tradicional",
            name: "Texas Burger",
            price: "25,50",
          }}
        />
      </div>
    </div>
  );
};

export default Tenant;
