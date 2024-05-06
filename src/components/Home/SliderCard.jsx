import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import imgErrorHandler from "../../utils/imgErrorHandler";

function SliderCard({ item, filterBy }) {
  const [releaseLoading, setReleaseLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showTracksAlone } = useReleaseContext();

  return (
    <Link
      to={filterBy === "artist" && `/artist/${item.id}`}
      className="SliderCard"
      onClick={() => {
        filterBy === "master" && showTracksAlone(item, setReleaseLoading);
      }}
    >
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
      <img
        src="/default3.png"
        alt="pic"
        style={{
          borderRadius: filterBy === "artist" ? "100px" : "5px",
          display: isLoading ? "block" : "none",
        }}
      />
      <img
        src={
          item.cover_image.includes("https://st.discogs.com/")
            ? "/default3.png"
            : item.cover_image
        }
        alt="pic"
        style={{
          borderRadius: filterBy === "artist" ? "100px" : "5px",
          display: isLoading ? "none" : "block",
        }}
        onLoad={() => setIsLoading(false)}
        onError={(e) => imgErrorHandler(e)}
      />
      <h4>{item.title}</h4>
    </Link>
  );
}

export default SliderCard;
