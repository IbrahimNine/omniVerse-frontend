import React, { useCallback, useEffect } from "react";
import "./FilteredItems.css";
import { useFiltersContext } from "../../contexts/FiltersContext";
import Album from "../Artist/Album";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import FilteredItem from "./FilteredItem";

function FilteredItems() {
  const { fetchMoreData, isPagedArtists, filteredData, loading } =
    useFiltersContext();
  const { showDetails, showTracksAlone } = useReleaseContext();

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const offset = 10;
    const hasScrolledToBottom =
      scrollTop + clientHeight + offset >= scrollHeight;
    if (hasScrolledToBottom && isPagedArtists) {
      fetchMoreData();
    }
  }, [isPagedArtists, fetchMoreData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const backToTopButton = document.querySelector("#backToTop");
  window.addEventListener("scroll", () => {
    if (backToTopButton !== null) {
      if (window.scrollY > 200) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    }
  });

  const HandleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="FilteredItems" onScroll={handleScroll}>
      {filteredData &&
        (filteredData.length > 0 ? (
          filteredData.map((item, index) => {
            return (
              <FilteredItem
                key={index}
                item={item}
                showTracksAlone={showTracksAlone}
              />
            );
          })
        ) : (
          <p>
            No records for the moment, try to search something or apply some
            filters 🙂
          </p>
        ))}
      {loading && (
        <img
          src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif"
          alt="loading"
          width={"30%"}
          className="loadingGif"
        />
      )}
      <button type="button" id="backToTop" onClick={HandleScrollUp}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 32 32"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M30 20L16 8L2 20"
          ></path>
        </svg>
      </button>
      {showDetails && <Album />}
    </div>
  );
}

export default FilteredItems;
