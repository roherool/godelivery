import { useState } from "react";
import { MagnifyingGlass } from "phosphor-react";

interface Props {
  onSearch: (searchValue: string) => void;
  mainColor: string;
}

export function SearchInput({ onSearch, mainColor }: Props) {
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      onSearch(searchValue);
    }
  };

  return (
    <div
      className={`flex p-2 border border-solid rounded-md mt-7 ${
        focused ? "border-orange-300" : "border-white"
      }`}
    >
      <button
        onClick={() => onSearch(searchValue)}
        className="flex items-center justify-center w-12 h-12 mr-2 bg-white rounded"
      >
        <MagnifyingGlass size={48} color={mainColor} />
      </button>
      <input
        type="text"
        placeholder="Busque o produto pelo nome"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyUp={handleKeyUp}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="flex-1 py-2 pl-3 text-base font-normal border-0 rounded outline-0"
      />
    </div>
  );
}
