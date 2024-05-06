import axios from "axios";
import { createContext, useCallback, useContext, useState } from "react";

const PlayedTracksContext = createContext();
export const usePlayedTracksContext = () => useContext(PlayedTracksContext);
export const PlayedTracksProvider = ({ children }) => {
  const [mostPlayedData, setMostPlayedData] = useState();
  const baseURL = process.env.REACT_APP_SERVER_BASE_URL;

  //__________________________________________________________________
  const updatePlayedTrack = (trackData) => {
    axios
      .put(
        `${baseURL}/api/user/playedTracks`,
        {
          trackTitle: trackData.ofTitle,
          trackAlbum: trackData.releaseData.title,
          trackAlbumPic: trackData.releaseData.images
            ? trackData.releaseData.images[0].uri
            : "/default3.png",
          trackAlbumID: `${trackData.releaseData.id}`,
          trackArtist: trackData.releaseData.artists_sort,
          trackArtistID: `${trackData.releaseData.artists[0].id}`,
          trackGenres: trackData.releaseData.styles
            ? trackData.releaseData?.styles[0]
            : null,
        },
        {
          withCredentials: true,
        }
      )
      .catch((err) => console.log(err));
  };

  //__________________________________________________________________
  const getUserPlayedTracks = useCallback(
    (userName,allRecordsFilter) => {
      axios
        .get(
          `${baseURL}/api/user/playedTracks/${userName}/${allRecordsFilter}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.status === "fail") {
            setMostPlayedData("");
          }
          if (res.data.status === "success") {
            setMostPlayedData(res.data.data);
          }
        })
        .catch((err) => console.log(err));
    },
    [baseURL]
  );

  return (
    <PlayedTracksContext.Provider
      value={{ updatePlayedTrack, getUserPlayedTracks, mostPlayedData }}
    >
      {children}
    </PlayedTracksContext.Provider>
  );
};
