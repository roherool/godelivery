import { Hamburger, List } from "phosphor-react";

import { Banner } from "../../components/Banner";
import { SearchInput } from "../../components/SearchInput";

const Tenant = () => {
  const handleSearch = (searchValue: string) => {
    console.log(`Você está buscando por: ${searchValue}`);
  };

  return (
    <div className="bg-white">
      <header className="bg-neutral-300 px-6 py-[50px]">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex mb-2 text-2xl font-medium text-neutral-800">
              Seja Bem Vindo(a)
              <Hamburger size={32} color="#FB9400" className="ml-2" />
            </div>
            <div className="text-base font-normal text-opacity-80 text-neutral-500">
              O que deseja pra hoje?
            </div>
          </div>
          <div className="header-top-right">
            <div className="flex flex-col justify-between">
              <List size={32} color="#FB9400" />
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <SearchInput onSearch={handleSearch} />
        </div>
      </header>
      <Banner />
    </div>
  );
};

export default Tenant;
