import React, { useState } from "react";
import { useFiltersContext } from "../../contexts/FiltersContext";
import { Link } from "react-router-dom";
import imgErrorHandler from "../../utils/imgErrorHandler"
// import ImageWithFallback from "react-image-fallback";

function FilteredItem({ item, showTracksAlone }) {
  const [isLoading, setIsLoading] = useState(true);
  const [releaseLoading, setReleaseLoading] = useState(false);
  const { filterBy } = useFiltersContext();

  return (
    <Link
      to={filterBy === "artist" ? `/artist/${item.id}` : null}
      onClick={
        filterBy === "master" &&
        (() => showTracksAlone(item, setReleaseLoading))
      }
    >
      <div className="ItemCard">
        {releaseLoading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
            className="releaseLoading"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth={2}
            >
              <path
                strokeDasharray={60}
                strokeDashoffset={60}
                strokeOpacity={0.3}
                d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="1.3s"
                  values="60;0"
                ></animate>
              </path>
              <path
                strokeDasharray={15}
                strokeDashoffset={15}
                d="M12 3C16.9706 3 21 7.02944 21 12"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.3s"
                  values="15;0"
                ></animate>
                <animateTransform
                  attributeName="transform"
                  dur="1.5s"
                  repeatCount="indefinite"
                  type="rotate"
                  values="0 12 12;360 12 12"
                ></animateTransform>
              </path>
            </g>
          </svg>
        )}
        {/* <ImageWithFallback
          src={
            item.cover_image.includes("https://st.discogs.com/")
              ? "/default3.png"
              : item.cover_image
          }
          initialImage="/default3.png"
          fallbackImage={"/default3.png"}
          fallbackDelay={90000}
          alt="pic"
          className="FilteredItemPic"
          style={{
            borderRadius: filterBy === "master" ? "5px" : "100px",
          }}
        /> */}
        <img
          src="/Default3.png"
          alt="pic"
          className="FilteredItemPic"
          style={{
            borderRadius: filterBy === "master" ? "5px" : "100px",
            display: isLoading ? "block" : "none",
          }}
        />
        <img
          data-src={item.cover_image}
          src={
            item.cover_image.includes("https://st.discogs.com/")
              ? "/Default3.png"
              : item.cover_image
          }
          alt="pic"
          className="FilteredItemPic FilteredItemPicOf"
          style={{
            borderRadius: filterBy === "master" ? "5px" : "100px",
            display: isLoading ? "none" : "block",
          }}
          onLoad={() => setIsLoading(false)}
          onError={(e) => imgErrorHandler(e)}
        />
        <abbr title={item.title} className="itemTitle">
          <h4>
            {item.title.slice(0, 45)}
            {item.title.length > 45 && "..."}
          </h4>
        </abbr>
      </div>
    </Link>
  );
}

export default FilteredItem;
