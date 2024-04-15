import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useRef, useState } from "react";
import SortByList from "./SortByList";
import TagsFilterList from "./TagsFilterList";

function TodoHome({ searchValue, setSearchValue }) {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showTagsFilter, setShowTagsFilter] = useState(false);

  const firstChevronRef = useRef(null);
  const secondChevronRef = useRef(null);

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  // This is the main page where u search for the todos ( home)
  return (
    <>
      <div className="container">
        <div className="search-box">
          <form>
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchValue}
              onChange={handleSearch}
              className="search-input"
              placeholder="Search for a Task"
            />
          </form>
        </div>
        <div className="flex hero">
          <div className="btn-wrapper">
            <button
              onClick={() => setShowSortOptions(!showSortOptions)}
              className="flex  filter-btn"
            >
              Sort
              <svg
                ref={firstChevronRef}
                className={` ${showSortOptions ? "flipped" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <SortByList
              show={showSortOptions}
              setShowSortOptions={setShowSortOptions}
              firstChevronRef={firstChevronRef}
            />
          </div>
          <div className="btn-wrapper">
            <button
              className="flex filter-btn"
              onClick={() => setShowTagsFilter(!showTagsFilter)}
            >
              Filter
              <svg
                ref={secondChevronRef}
                className={` ${showTagsFilter ? "flipped" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <TagsFilterList
              showTagsFilter={showTagsFilter}
              setShowTagsFilter={setShowTagsFilter}
              secondChevronRef={secondChevronRef}
            />
          </div>
        </div>
        <div>
          <Link to="/create" className="push-btn flex">
            + Create New Task
          </Link>
        </div>
      </div>
    </>
  );
}

export default TodoHome;
