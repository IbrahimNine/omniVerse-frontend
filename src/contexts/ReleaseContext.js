import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ReleaseContext = createContext();
export const useReleaseContext = () => useContext(ReleaseContext);
export function ReleaseProvider({ children }) {
  const [releaseData, setReleaseData] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [releaseCord, setReleaseCord] = useState();
  const [onQueue, setOnQueue] = useState(null);
  const [isPlaying, setIsPlaying] = useState();
  const [playTrack, setPlayTrack] = useState(false);
  const [trackData, setTrackData] = useState({
    id: "LS31VZCeD7c",
    title: "Gabriel Saban - Omniverse",
    originalTitle: "Gabriel Saban - Omniverse",
  });
  const [play, setPlay] = useState(false);
  const [showModia, setShowMedia] = useState(false);
  const [played, setPlayed] = useState(0);
  const playerRef = useRef(null);
  const [playerLoading, setPlayerLoading] = useState(false);
  const [loadingAlbum, setLoadingAlbum] = useState(false);
  const discogsKey = process.env.REACT_APP_DISCOGS_KEY;
  const discogsSecretKey = process.env.REACT_APP_DISCOGS_SECRET_KEY;
  const baseURL = process.env.REACT_APP_SERVER_BASE_URL;
  const [nextResults, setNextResults] = useState(1);

  //___________________________________________________________________________________
  const showTracks = (release) => {
    if (!showDetails) {
      setLoadingAlbum(true);
      axios
        .get(
          `https://api.discogs.com/releases/${
            release.main_release ? release.main_release : release.id
          }`,
          {
            headers: {
              Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
            },
          }
        )
        .then((res) => {
          setReleaseData(res.data);
          setReleaseCord(release);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoadingAlbum(false));
    } else {
      setReleaseData();
      setReleaseCord();
    }
    setShowDetails(!showDetails);
  };

  //___________________________________________________________________________________
  const showTracksAlone = (release, setReleaseLoading) => {
    if (release) {
      let releaseId = "";
      setReleaseLoading(true);
      setLoadingAlbum(true);
      axios
        .get(`https://api.discogs.com/masters/${release.id}`, {
          headers: {
            Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
          },
        })
        .then((res) => {
          releaseId = res.data.main_release;

          axios
            .get(`https://api.discogs.com/releases/${releaseId}`, {
              headers: {
                Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
              },
            })
            .then((res) => {
              setReleaseData(res.data);
              setReleaseCord(release);
              setShowDetails(!showDetails);
            })
            .catch((err) => console.log(err))
            .finally(() => {
              setReleaseLoading(false);
              setLoadingAlbum(false);
            });
        })
        .catch((err) => console.log(err));
    }
  };

  //___________________________________________________________________________________
  const handlePlaying = () => {
    setPlay(!play);
    setPlayTrack(!playTrack);
  };

  //___________________________________________________________________________________
  const retrieveData = (artists_sort, item, setIsLoading, index) => {
    setPlayerLoading(true);
    setPlay(false);
    axios
      .post(`${baseURL}/api/stream`, {
        query: `${artists_sort.split(/[()]/)[0].trim()} ${item.title}`,
      })
      .then((res) => {
        setTrackData({
          id: res.data[0].id,
          title: res.data[0].title,
          releaseData: releaseData,
          ofTitle: item.title.trim(),
          originalTitle: `${artists_sort.split(/[()]/)[0].trim()} - ${
            item.title
          }`,
        });
        setPlay(true);
        setShowMedia(true);
        setOnQueue({
          trackIndex: index,
          releaseData: releaseData,
        });
        setPlayerLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        setNextResults(1);
      });
  };

  //___________________________________________________________________________________
  const nextOnQueue = () => {
    if (
      onQueue &&
      onQueue.trackIndex < onQueue.releaseData.tracklist.length - 1
    ) {
      setPlayerLoading(true);
      setPlay(false);
      setIsPlaying({
        index: onQueue.trackIndex + 1,
        artists_sort: onQueue.releaseData.artists_sort,
        title: onQueue.releaseData.tracklist[onQueue.trackIndex + 1].title,
      });
      axios
        .post(`${baseURL}/api/stream`, {
          query: `${onQueue.releaseData.artists_sort.split(/[()]/)[0].trim()} ${
            onQueue.releaseData.tracklist[onQueue.trackIndex + 1].title
          }`,
        })
        .then((res) => {
          setTrackData({
            ...trackData,
            id: res.data[0].id,
            title: res.data[0].title,
            ofTitle:
              onQueue.releaseData.tracklist[
                onQueue.trackIndex + 1
              ].title.trim(),
            originalTitle: `${onQueue.releaseData.artists_sort
              .split(/[()]/)[0]
              .trim()} - ${
              onQueue.releaseData.tracklist[onQueue.trackIndex + 1].title
            }`,
          });
          setPlay(true);
          setPlayerLoading(false);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setOnQueue({ ...onQueue, trackIndex: onQueue.trackIndex + 1 });
          setNextResults(1);
        });
    }
  };
  //___________________________________________________________________________________
  const previousOnQueue = () => {
    if (onQueue && onQueue.trackIndex > 0) {
      setPlayerLoading(true);
      setPlay(false);
      setIsPlaying({
        index: onQueue.trackIndex - 1,
        artists_sort: onQueue.releaseData.artists_sort,
        title: onQueue.releaseData.tracklist[onQueue.trackIndex - 1].title,
      });
      axios
        .post(`${baseURL}/api/stream`, {
          query: `${onQueue.releaseData.artists_sort.split(/[()]/)[0].trim()} ${
            onQueue.releaseData.tracklist[onQueue.trackIndex - 1].title
          }`,
        })
        .then((res) => {
          setTrackData({
            ...trackData,
            id: res.data[0].id,
            title: res.data[0].title,
            ofTitle:
              onQueue.releaseData.tracklist[
                onQueue.trackIndex - 1
              ].title.trim(),
            originalTitle: `${onQueue.releaseData.artists_sort
              .split(/[()]/)[0]
              .trim()} - ${
              onQueue.releaseData.tracklist[onQueue.trackIndex - 1].title
            }`,
          });
          setPlay(true);
          setPlayerLoading(false);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setOnQueue({ ...onQueue, trackIndex: onQueue.trackIndex - 1 });
          setNextResults(1);
        });
    }
  };

  //___________________________________________________________________________________
  const nextYoutubeResult = () => {
    setPlay(false);

    if (releaseData && nextResults < 10) {
      setPlayerLoading(true);
      axios
        .post(`${baseURL}/api/stream`, {
          query: `${onQueue.releaseData.artists_sort.split(/[()]/)[0].trim()} ${
            onQueue.releaseData.tracklist[onQueue.trackIndex].title
          }`,
        })
        .then((res) => {
          setTrackData({
            ...trackData,
            id: res.data[nextResults].id,
            title: res.data[nextResults].title,
          });
          setPlay(true);
          setPlayerLoading(false);
          setNextResults(nextResults + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  //___________________________________________________________________________________

  useEffect(() => {
    if (
      trackData.id &&
      trackData.title &&
      trackData.title !== "Gabriel Saban - Omniverse"
    ) {
      // setPlay(true);
      setPlayTrack(true);
    }
  }, [trackData]);

  return (
    <ReleaseContext.Provider
      value={{
        showDetails,
        setShowDetails,
        releaseData,
        setReleaseData,
        showTracks,
        releaseCord,
        setReleaseCord,
        showTracksAlone,
        handlePlaying,
        play,
        setPlay,
        trackData,
        retrieveData,
        nextOnQueue,
        previousOnQueue,
        nextYoutubeResult,
        isPlaying,
        setIsPlaying,
        playTrack,
        setPlayTrack,
        playerLoading,
        loadingAlbum,
        played,
        setPlayed,
        playerRef,
        showModia,
      }}
    >
      {children}
    </ReleaseContext.Provider>
  );
}
