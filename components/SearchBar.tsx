import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <div className="relative hidden md:block w-64 rounded-full bg-white">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
      <Input placeholder="책 제목 / 작가 검색" className="pl-10 rounded-full border border-gray-300"/>
    </div>
  );
};

export default SearchBar