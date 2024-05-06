import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ArtistContext = createContext();
export const useArtistContext = () => useContext(ArtistContext);

export function ArtistContextProvider({ children }) {
  const [id, setId] = useState();
  const [artistData, setArtistData] = useState({});
  const [artistReleases, setArtistReleases] = useState([]);
  const [showFullSize, setShowFullSize] = useState(false);
  const [isPagedReleases, setIsPagedReleases] = useState(false);
  const [pageNumberRelease, setPageNumberRelease] = useState(2);
  const [releasesLoading, setReleasesLoading] = useState(false);
  const discogsKey = process.env.REACT_APP_DISCOGS_KEY;
  const discogsSecretKey = process.env.REACT_APP_DISCOGS_SECRET_KEY;

  useEffect(() => {
    if (id) {
      setReleasesLoading(true);
      setArtistReleases(null);
      axios
        .get(`https://api.discogs.com/artists/${id}`, {
          headers: {
            Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
          },
        })
        .then((res) => setArtistData(res.data))
        .catch((err) => console.log(err));
      axios
        .get(`https://api.discogs.com/artists/${id}/releases?sort=year`, {
          headers: {
            Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
          },
        })
        .then((res) => {
          setArtistReleases(
            res.data.releases.filter((item) => item.role === "Main")
          );
          setIsPagedReleases(res.data.pagination.pages > 1);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setReleasesLoading(false));
    }
  }, [id, discogsKey, discogsSecretKey]);

  const fetchMoreReleases = () => {
    setReleasesLoading(true);
    axios
      .get(
        `https://api.discogs.com/artists/${id}/releases?sort=year&page=${pageNumberRelease}`,
        {
          headers: {
            Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
          },
        }
      )
      .then((res) => {
        setArtistReleases([
          ...artistReleases,
          ...res.data.releases.filter((item) => item.role === "Main"),
        ]);
        setIsPagedReleases(res.data.pagination.pages > pageNumberRelease);
        setPageNumberRelease(pageNumberRelease + 1);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setReleasesLoading(false));
  };

  return (
    <ArtistContext.Provider
      value={{
        artistData,
        artistReleases,
        setId,
        showFullSize,
        setShowFullSize,
        fetchMoreReleases,
        isPagedReleases,
        releasesLoading,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
}
