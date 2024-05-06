import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";

const FiltersContext = createContext();
export const useFiltersContext = () => useContext(FiltersContext);

export const FiltersProvider = ({ children }) => {
  const [filterSet, setFilterSet] = useState({});
  const [filteredData, setFilteredData] = useState();
  const [globalSearch, setGlobalSearch] = useState("");
  const [filterBy, setFilterBy] = useState("master");
  const [loading, setLoading] = useState(true);
  const [isPagedArtists, setIsPagedArtists] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const { user } = useAuthContext();
  const genreIds = user?.topGenres?.map((genre) => genre._id);
  const firstGenre = user?.topGenres ? genreIds[0] : "";
  const secondGenre = user?.topGenres ? genreIds[1] : "";
  const discogsKey = process.env.REACT_APP_DISCOGS_KEY;
  const discogsSecretKey = process.env.REACT_APP_DISCOGS_SECRET_KEY;

  //_______________________________________________________________________________
  useEffect(() => {
    const fetchingdata = () => {
      setLoading(true);
      setFilteredData(null);
      if (user === undefined) {
        return null;
      } else {
        axios
          .get(
            `https://api.discogs.com/database/search?q=${
              globalSearch ? globalSearch : ""
            }&type=${filterBy}&style=${
              filterSet.style
                ? filterSet.style
                : user?.topGenres &&
                  filterBy === "master" &&
                  !globalSearch &&
                  !filterSet.country &&
                  !filterSet.year
                ? firstGenre + "&style=" + secondGenre
                : ""
            }&country=${filterSet.country ? filterSet.country : ""}&year=${
              filterSet.year ? filterSet.year : ""
            }`,
            {
              headers: {
                Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
              },
            }
          )
          .then((res) => {
            setIsPagedArtists(res.data.pagination.pages > 1);
            setFilteredData(res.data.results);
          })
          .then(() => setLoading(false))
          .catch((err) => console.log(err));
      }
    };
    fetchingdata();
  }, [
    filterSet,
    filterBy,
    globalSearch,
    discogsKey,
    discogsSecretKey,
    user,
    firstGenre,
    secondGenre,
  ]);

  //_______________________________________________________________________________
  const fetchMoreData = () => {
    setLoading(true);
    if (user === undefined) {
      return null;
    } else {
      axios
        .get(
          `https://api.discogs.com/database/search?q=${
            globalSearch ? globalSearch : ""
          }&type=${filterBy}&style=${
            filterSet.style
              ? filterSet.style
              : user?.topGenres &&
                filterBy === "master" &&
                !globalSearch &&
                !filterSet.country &&
                !filterSet.year
              ? firstGenre + "&style=" + secondGenre
              : ""
          }&country=${filterSet.country ? filterSet.country : ""}&year=${
            filterSet.year ? filterSet.year : ""
          }&page=${pageNumber}`,
          {
            headers: {
              Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
            },
          }
        )
        .then((res) => {
          setFilteredData([...filteredData, ...res.data.results]);
          setIsPagedArtists(res.data.pagination.pages > pageNumber);
          setPageNumber(pageNumber + 1);
          setLoading(false);
        })
        .then(() => setLoading(false))
        .catch((err) => console.log(err));
    }
  };

  return (
    <FiltersContext.Provider
      value={{
        filterSet,
        setFilterSet,
        globalSearch,
        setGlobalSearch,
        filterBy,
        setFilterBy,
        filteredData,
        loading,
        isPagedArtists,
        fetchMoreData,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
