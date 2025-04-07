import { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

function SearchBar({ data }) {
  const [searchTerm, setSearchTerm] = useState(data ? data : "");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/course?searchterm=${searchTerm}`, {
      state: { data: searchTerm },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-2 border-gray-500/80 rounded-sm py-1 px-2 gap-2 w-full max-w-xl"
    >
      <img src={assets.search_icon} alt="search icon" />
      <input
        type="text"
        name="search"
        id="search"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        placeholder="Search for course"
        required
        className="w-full outline-none text-gray-500/80"
        autoComplete="off"
      />
      <input
        type="submit"
        value="Search"
        className="bg-blue-700 px-4 py-1 sm:px-6 sm:py-1.5 rounded-sm text-white"
      />
    </form>
  );
}

export default SearchBar;
