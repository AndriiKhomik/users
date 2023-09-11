import { AiOutlineSearch } from "react-icons/ai";
import { useActions } from "../hooks/actions";

const SearchInput = () => {
  const { setSearch } = useActions();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setSearch(e.target.value);
    }, 1000);
  };

  return (
    <div className="px-4 mt-3 relative">
      <span className="absolute inset-y-0 left-4 flex items-center pl-2">
        <AiOutlineSearch className="text-gray-500" />
      </span>
      <input
        type="text"
        className="border rounded-lg bg-gray-100 w-full focus:outline-none p-1 text-[13px] pl-7"
        placeholder="Search..."
        onChange={handleInput}
      />
    </div>
  );
};

export default SearchInput;
