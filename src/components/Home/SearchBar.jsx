import { useState, useEffect } from "react";
import { useFiltersContext } from "../../contexts/FiltersContext";
import { useLocation, useNavigate } from "react-router-dom";

function SearchBar() {
  const [showSearch, setShowSearch] = useState(false);
  const [globalSearchInput, setGlobalSearchinput] = useState("");
  const { setGlobalSearch, setFilterSet } = useFiltersContext();
  const navigate = useNavigate();
  const params = useLocation();

  const showSearchHandler = (e) => {
    e.preventDefault();
    if (showSearch) {
      const navbarInput = document.querySelector(".searchInput");
      navbarInput.style.width = "30px";
      setTimeout(() => {
        setShowSearch(!showSearch);
      }, 400);
    } else {
      setShowSearch(!showSearch);
    }
  };
  useEffect(() => {
    let delayEffect;
    if (showSearch) {
      const navbarInput = document.querySelector(".searchInput");
      delayEffect = setTimeout(() => {
        navbarInput.style.width = "70%";
      }, 0);
    }
    return () => {
      clearTimeout(delayEffect);
    };
  }, [showSearch]);

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    setGlobalSearch(globalSearchInput);
    setFilterSet({});
    if (params.pathname !== "/music") {
      navigate("/music");
    }
  };

  return (
    <div className="SearchBar">
      {!showSearch && (
        <button id="searchButton" onClick={showSearchHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
            />
          </svg>
        </button>
      )}
      {showSearch && (
        <form className="searchInput" onSubmit={handleGlobalSearch}>
          <input
            type="text"
            placeholder="Search..."
            autoFocus
            onChange={(e) => setGlobalSearchinput(e.target.value)}
          />
          <button type="Submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  fill="currentColor"
                  d="M19 11a8 8 0 1 1-16 0a8 8 0 0 1 16 0"
                  opacity="0.16"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
                />
              </g>
            </svg>
          </button>
          <button onClick={showSearchHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
              />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}

export default SearchBar;
