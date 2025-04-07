import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function CourseHeader({ searchTerm }) {
  return (
    <div className="flex justify-between items-center flex-wrap mt-16 sm:mt-20 gap-6 ">
      <div>
        <h2 className="text-xl sm:text-4xl font-medium">Course List</h2>
        <div>
          <Link to="/" className="text-blue-600">
            Home
          </Link>
          / Course List
        </div>
      </div>

      <SearchBar data={searchTerm} />
    </div>
  );
}

export default CourseHeader;
