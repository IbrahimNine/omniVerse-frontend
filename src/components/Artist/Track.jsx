import React, { useState } from "react";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import { useAuthContext } from "../../contexts/AuthContext";

function Track({ item, artists_sort, index }) {
  const {
    retrieveData,
    isPlaying,
    setIsPlaying,
    playTrack,
    setPlayTrack,
    handlePlaying,
  } = useReleaseContext();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = () => {
    if (
      isPlaying?.index === index &&
      isPlaying?.artists_sort === artists_sort &&
      isPlaying?.title === item.title
    ) {
      handlePlaying();
      return;
    } else {
      setIsPlaying({ index, artists_sort, title: item.title });
      setIsLoading(true);
      retrieveData(artists_sort, item, setIsLoading, index);
      setPlayTrack((prevPlayTrack) => !prevPlayTrack);
    }
  };

  return (
    <div className="track">
      <div className="track-details">
        <p>{item.position}</p>
        <p className="track-details-title">{item.title}</p>
        <p>{item.duration}</p>
      </div>
      <div className="controlsWrapper">
        <button className="controls" onClick={handlePlay}>
          <abbr title="Play/Pause">
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
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
            ) : playTrack &&
              isPlaying.index === index &&
              isPlaying.artists_sort === artists_sort &&
              isPlaying.title === item.title ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M216 48v160a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16M96 32H56a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h40a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="m11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                ></path>
              </svg>
            )}
          </abbr>
        </button>
        {user && (
          <button className="controls">
            <a
              href={`https://hayqbhgr.slider.kz/#${artists_sort
                .split(/[()]/)[0]
                .trim()} ${item.title}`}
              target="_blank"
              rel="noreferrer"
            >
              <abbr title="Download">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M6.697 6.697a7.5 7.5 0 0 1 12.794 4.927A4.002 4.002 0 0 1 18.5 19.5h-12a5 5 0 0 1-1.667-9.715a7.47 7.47 0 0 1 1.864-3.088m4.596 9.01a1 1 0 0 0 1.414 0l2-2a1 1 0 0 0-1.414-1.414l-.293.293V9a1 1 0 1 0-2 0v3.586l-.293-.293a1 1 0 0 0-1.414 1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </abbr>
            </a>
          </button>
        )}
      </div>
    </div>
  );
}

export default Track;
