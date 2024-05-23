import "./Player.css";
import ReactPlayer from "react-player/lazy";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import { useState } from "react";
import { usePlayedTracksContext } from "../../contexts/PlayedTracksContext";
import { useAuthContext } from "../../contexts/AuthContext";

function Player() {
  const {
    trackData,
    play,
    handlePlaying,
    nextOnQueue,
    previousOnQueue,
    nextYoutubeResult,
    showTracks,
    setPlay,
    setPlayTrack,
    playerLoading,
    played,
    setPlayed,
    playerRef,
  } = useReleaseContext();
  const { user, showOnQueue, setShowOnQueue } = useAuthContext();
  const { updatePlayedTrack } = usePlayedTracksContext();
  const [volume, setVolume] = useState(90);
  const [duration, setDuration] = useState(null);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };
  const handleSeekChange = (e) => {
    const seekTo = parseFloat(e.target.value);
    setPlayed(seekTo);
    playerRef.current.seekTo(seekTo, "fraction");
  };
  const handleProgress = (progress) => {
    if (!isNaN(progress.played)) {
      setPlayed(progress.played);
    }
  };
  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const formatTime = (time) => {
    if (!isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.round(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return "Loading...";
  };

  const trackEnding = () => {
    handlePlaying();
    nextOnQueue();
    if (trackData.ofTitle && trackData.releaseData && user) {
      updatePlayedTrack(trackData);
    }
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 133) {
      event.preventDefault();
      handlePlaying();
    }
  };

  return (
    <div className="omniVersePlayer">
      <a
        href={`https://www.youtube.com/watch?v=${
          trackData.id
        }&start=${Math.floor(played * duration)}`}
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          setPlay(false);
          setPlayTrack(false);
        }}
        id="VideoThumbnail"
      >
        <img
          className="TrackCover"
          src={`https://img.youtube.com/vi/${trackData.id}/default.jpg`}
          alt="Track cover thumbnail"
        />
      </a>
      <abbr title="Next Youtube results">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 1024 1024"
          className="refreshYoutube"
          onClick={nextYoutubeResult}
        >
          <path
            fill="currentColor"
            d="M497.408 898.56c-.08-.193-.272-.323-.385-.483l-91.92-143.664c-6.528-10.72-20.688-14.527-31.728-8.512l-8.193 5.04c-11.007 6-10.767 21.537-4.255 32.256l58.927 91.409c-5.024-1.104-10.096-2-15.056-3.296c-103.184-26.993-190.495-96.832-239.535-191.6c-46.336-89.52-55.04-191.695-24.512-287.743c30.512-96.048 99.775-174.464 189.295-220.784c15.248-7.888 21.2-26.64 13.312-41.856c-7.872-15.264-26.64-21.231-41.855-13.327c-104.272 53.952-184.4 145.28-219.969 257.152C45.982 485.008 56.11 604.033 110.078 708.29c57.136 110.336 158.832 191.664 279.024 223.136c1.36.352 2.784.56 4.16.911l-81.311 41.233c-11.008 6.032-14.657 19.631-8.128 30.351l3.152 8.176c6.56 10.72 17.84 14.527 28.815 8.512L484.622 944.4c.193-.128.385-.096.578-.224l9.984-5.456c5.52-3.024 9.168-7.969 10.624-13.505c1.52-5.52.815-11.663-2.448-16.991zm416.496-577.747c-57.056-110.304-155.586-191.63-275.762-223.118c-8.56-2.24-17.311-3.984-26.048-5.712l79.824-40.48c11.008-6.033 17.568-19.632 11.04-30.369l-3.153-8.16c-6.56-10.736-20.752-14.528-31.727-8.528L519.262 80.654c-.176.112-.384.08-.577.208l-9.967 5.472c-5.537 3.04-9.168 7.967-10.624 13.503c-1.52 5.52-.816 11.648 2.464 16.976l5.92 9.712c.096.192.272.305.384.497l91.92 143.648c6.512 10.736 20.688 14.528 31.712 8.513l7.216-5.025c11.008-6 11.727-21.536 5.231-32.24l-59.2-91.856c13.008 2 25.968 4.416 38.624 7.76c103.232 27.04 187.393 96.864 236.4 191.568c46.32 89.519 55.024 191.695 24.48 287.728c-30.511 96.047-96.655 174.448-186.174 220.816c-15.233 7.887-21.168 26.607-13.28 41.87c5.519 10.64 16.335 16.768 27.599 16.768c4.8 0 9.664-1.12 14.272-3.488c104.272-53.936 181.248-145.279 216.816-257.119c35.536-111.904 25.393-230.929-28.574-335.152"
          ></path>
        </svg>
      </abbr>
      <button
        type="button"
        className="previousOnQueue"
        onClick={previousOnQueue}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3.885 21.06a.76.76 0 0 1-.75-.75V3.69a.75.75 0 0 1 1.5 0v16.6a.75.75 0 0 1-.75.77m16.98-15.713v13.25a2.35 2.35 0 0 1-.32 1.13a2.2 2.2 0 0 1-1.89 1.07h-.1a2.089 2.089 0 0 1-1.11-.36l-9.13-6.12a2.25 2.25 0 0 1-.71-.76a2.29 2.29 0 0 1-.27-1a2.18 2.18 0 0 1 .2-1a2.22 2.22 0 0 1 .64-.81l9.14-7.09a2.22 2.22 0 0 1 1.13-.44a2.2 2.2 0 0 1 2.09 1.02c.204.335.318.718.33 1.11"
          ></path>
        </svg>
      </button>
      <button
        className="play-pause"
        onClick={() => {
          if (!playerLoading) {
            handlePlaying();
          }
        }}
        onKeyDown={() => {
          if (!playerLoading) {
            handleKeyDown();
          }
        }}
      >
        {playerLoading ? (
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
        ) : play ? (
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
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"
            ></path>
          </svg>
        )}
      </button>
      <button type="button" className="nextOnQueue" onClick={nextOnQueue}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M20.095 21a.75.75 0 0 1-.75-.75V3.75a.75.75 0 0 1 1.5 0v16.5a.74.74 0 0 1-.75.75m-3.4-9.589a2.25 2.25 0 0 1-.85 1.82l-9.11 7.09c-.326.247-.713.4-1.12.44h-.23a2.142 2.142 0 0 1-1-.22a2.201 2.201 0 0 1-.9-.81a2.17 2.17 0 0 1-.33-1.16V5.421a2.22 2.22 0 0 1 .31-1.12a2.25 2.25 0 0 1 .85-.8a2.18 2.18 0 0 1 2.24.1l9.12 6.08c.29.191.53.448.7.75a2.3 2.3 0 0 1 .32.98"
          ></path>
        </svg>
      </button>

      <ReactPlayer
        className="omniVersePlayer"
        url={`https://www.youtube.com/watch?v=${trackData.id}&volume=100`}
        width={0}
        height={0}
        playing={play}
        volume={volume / 100}
        muted={volume === 0}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={trackEnding}
        ref={playerRef}
        playsinline={true}
        pip={true}
      />
      <div className="progressBar">
        <span
          onClick={() => {
            trackData.releaseData && showTracks(trackData.releaseData);
          }}
          className="toShowAlbum"
        >
          {trackData.title.length > 50
            ? trackData.title.slice(0, 50) + "..."
            : trackData.title}
          <abbr title="Show played album">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="showOnQueue"
            >
              <path
                fill="currentColor"
                d="M15.784 19q-.996 0-1.688-.69t-.692-1.675q0-1.002.695-1.703q.696-.701 1.69-.701q.384 0 .733.143q.35.143.651.384V7.73q0-.31.21-.52q.21-.211.52-.211h2.366q.31 0 .52.21q.211.21.211.52q0 .31-.21.52q-.21.212-.52.212h-2.097v8.173q0 .985-.697 1.675q-.697.69-1.692.69M4.5 14.77q-.213 0-.356-.145T4 14.27q0-.213.144-.357q.143-.143.356-.143h6.038q.213 0 .357.144t.143.357q0 .213-.143.356t-.357.143zm0-3.385q-.213 0-.356-.144T4 10.884q0-.213.144-.356q.143-.143.356-.143h9.788q.213 0 .357.144q.143.143.143.356t-.143.356q-.144.144-.357.144zM4.5 8q-.213 0-.356-.144T4 7.499q0-.212.144-.356Q4.288 7 4.5 7h9.788q.213 0 .357.144q.143.144.143.357q0 .212-.143.356Q14.5 8 14.288 8z"
              ></path>
            </svg>
          </abbr>
        </span>
        <div className="range-container">
          <input
            type="range"
            min="0"
            max="1"
            step="any"
            value={played}
            onChange={handleSeekChange}
          />
          <div
            className="progress-bar"
            style={{
              width: played > 0 ? `${played * 100 + 0.3}%` : `${played * 100}%`,
            }}
          ></div>
        </div>
        <span>
          <span>{`${formatTime(Math.floor(played * duration))}/${formatTime(
            duration
          )}`}</span>
        </span>
      </div>
      <div className="volumeSet">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={17}
            height={17}
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="m27.16 8.08l-1.53 1.29a10 10 0 0 1-.29 13.23l1.47 1.4a12 12 0 0 0 .35-15.88Z"
            ></path>
            <path
              fill="currentColor"
              d="M21.58 12a6 6 0 0 1-.18 7.94l1.47 1.36a8 8 0 0 0 .23-10.59zM18 30a1 1 0 0 1-.71-.3L9.67 22H3a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h6.67l7.62-7.7a1 1 0 0 1 1.41 0a1 1 0 0 1 .3.7v26a1 1 0 0 1-1 1"
            ></path>
          </svg>
        </span>
        <div className="range-container">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={volume}
            onChange={handleVolumeChange}
          />
          <div
            className="progress-bar"
            style={{ width: volume > 0 ? `${volume + 1}%` : `${volume}%` }}
          ></div>
        </div>
        <span>{volume}%</span>
      </div>
      <abbr
        title="Lastest listened tracks"
        className="LastPlayedTracks"
        onClick={() => setShowOnQueue(!showOnQueue)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 256 256"
        >
          <g fill="currentColor">
            <path d="m240 160l-64 40v-80Z" opacity={0.2}></path>
            <path d="M32 64a8 8 0 0 1 8-8h176a8 8 0 0 1 0 16H40a8 8 0 0 1-8-8m104 56H40a8 8 0 0 0 0 16h96a8 8 0 0 0 0-16m0 64H40a8 8 0 0 0 0 16h96a8 8 0 0 0 0-16m112-24a8 8 0 0 1-3.76 6.78l-64 40A8 8 0 0 1 168 200v-80a8 8 0 0 1 12.24-6.78l64 40A8 8 0 0 1 248 160m-23.09 0L184 134.43v51.14Z"></path>
          </g>
        </svg>
      </abbr>
    </div>
  );
}

export default Player;
