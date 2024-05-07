import React, { useEffect, useState } from "react";
import "./User.css";
import { usePlayedTracksContext } from "../contexts/PlayedTracksContext";
import { useAuthContext } from "../contexts/AuthContext";
import { Link, useParams } from "react-router-dom";
import { useReleaseContext } from "../contexts/ReleaseContext";
import DataBar from "../components/User/DataBar";
import { motion } from "framer-motion";
import imgErrorHandler from "../utils/imgErrorHandler";
import PlayedData from "../components/User/PlayedData";

function User() {
  const { getUserPlayedTracks, mostPlayedData } = usePlayedTracksContext();
  const { showTracks } = useReleaseContext();
  const { user } = useAuthContext();
  const { userName } = useParams();
  const [recordsFilter, setRecordsFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  useEffect(() => {
    getUserPlayedTracks(userName, "All TIME");
  }, [getUserPlayedTracks, userName]);

  useEffect(() => {
    const originalTitle = document.title;
    if (user.userName !== undefined) {
      document.title = `${user.userName}'s profile | ${document.title}`;
    }
    return () => {
      document.title = originalTitle;
    };
  }, [user]);

  return (
    <div className="UserWrapper">
      <div className="User">
        <div className="UserDetailedDash">
          <div
            id="userProfilePic"
            style={{
              backgroundImage: `linear-gradient(to top,rgba(14,14,19,255) 20%,transparent 100%) ,url(${user.userPic}) `,
            }}
          />
          {mostPlayedData && <DataBar mostPlayedData={mostPlayedData} />}
          <p style={{ color: "gray" }}>
            Total listens:&nbsp;
            {mostPlayedData ? mostPlayedData.total : 0}
          </p>
        </div>
        <div className="userDetailedData">
          <div className="mostPlayedWrapper">
            {mostPlayedData && (
              <>
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="mostPlayedCardWrapper"
                >
                  <h3 className="styledTitle">Last 7 days top record</h3>
                  <div className="mostPlayed">
                    <img
                      src="/Default3.png"
                      alt=""
                      className="mostPlayedImg"
                      style={{
                        display: isLoading ? "block" : "none",
                      }}
                    />
                    <img
                      src={
                        mostPlayedData?.weekly.trackAlbumPic || "/Default3.png"
                      }
                      alt=""
                      className="mostPlayedImg"
                      style={{
                        display: isLoading ? "none" : "block",
                      }}
                      onLoad={() => setIsLoading(false)}
                      onError={(e) => imgErrorHandler(e)}
                    />

                    <div className="mostPlayedDetails">
                      <h3
                        onClick={() =>
                          showTracks({
                            id: mostPlayedData?.weekly.trackAlbumID,
                          })
                        }
                      >
                        {mostPlayedData?.weekly.trackAlbum}
                      </h3>
                      <Link
                        to={`/artist/${mostPlayedData?.weekly.trackArtistID}`}
                      >
                        <h5>{mostPlayedData?.weekly.trackArtist}</h5>
                      </Link>
                      <h4>{mostPlayedData?.weeklyCount} Listens</h4>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  className="mostPlayedCardWrapper"
                  style={{
                    backgroundColor: "rgba(233, 241, 255, 0.038)",
                  }}
                >
                  <h3 className="styledTitle">Last 30 days top record</h3>
                  <div className="mostPlayed">
                    <img
                      src="/Default3.png"
                      alt=""
                      className="mostPlayedImg"
                      style={{
                        display: isLoading1 ? "block" : "none",
                      }}
                    />
                    <img
                      src={
                        mostPlayedData?.monthly.trackAlbumPic || "/Default3.png"
                      }
                      alt=""
                      className="mostPlayedImg"
                      style={{
                        display: isLoading1 ? "none" : "block",
                      }}
                      onLoad={() => setIsLoading1(false)}
                      onError={(e) => imgErrorHandler(e)}
                    />

                    <div className="mostPlayedDetails">
                      <h3
                        onClick={() =>
                          showTracks({
                            id: mostPlayedData?.monthly.trackAlbumID,
                          })
                        }
                      >
                        {mostPlayedData?.monthly.trackAlbum}
                      </h3>
                      <Link
                        to={`/artist/${mostPlayedData?.monthly.trackArtistID}`}
                      >
                        <h5>{mostPlayedData?.monthly.trackArtist}</h5>
                      </Link>
                      <h4>{mostPlayedData?.monthlyCount} Listens</h4>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                  }}
                  className="mostPlayedCardWrapper"
                >
                  <h3 className="styledTitle">Last 365 days top record</h3>
                  <div className="mostPlayed">
                    <img
                      src="/Default3.png"
                      alt=""
                      className="mostPlayedImg"
                      style={{
                        display: isLoading2 ? "block" : "none",
                      }}
                    />
                    <img
                      src={
                        mostPlayedData?.yearly.trackAlbumPic || "/Default3.png"
                      }
                      alt=""
                      className="mostPlayedImg"
                      style={{
                        display: isLoading2 ? "none" : "block",
                      }}
                      onLoad={() => setIsLoading2(false)}
                      onError={(e) => imgErrorHandler(e)}
                    />

                    <div className="mostPlayedDetails">
                      <h3
                        onClick={() =>
                          showTracks({
                            id: mostPlayedData?.yearly.trackAlbumID,
                          })
                        }
                      >
                        {mostPlayedData?.yearly.trackAlbum}
                      </h3>
                      <Link
                        to={`/artist/${mostPlayedData?.yearly.trackArtistID}`}
                      >
                        <h5>{mostPlayedData?.yearly.trackArtist}</h5>
                      </Link>
                      <h4>{mostPlayedData?.yearlyCount} Listens</h4>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>
          <div
            style={{
              width: "95%",
              minHeight: "1px",
              backgroundColor: "rgba(105, 105, 105, 0.527)",
            }}
          />

          <div id="listenedArtists" className="styledTitle">
            <h2>Records you've heard</h2>
            <div className="listenedArtistsTools">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                  setRecordsFilter(e.target.value);
                }}
              />
              <select
                onChange={(e) => {
                  getUserPlayedTracks(userName, e.target.value);
                }}
              >
                <option value="ALL TIME">All time</option>
                <option value="LAST YEAR">Last 365 days</option>
                <option value="LAST MONTH">Last 30 days</option>
                <option value="LAST WEEK">Last 7 days</option>
              </select>
            </div>
          </div>

          {mostPlayedData &&
            mostPlayedData.allAlbumsPlayed
              .filter((item) => {
                return (
                  item.albumArtist
                    .toLowerCase()
                    .includes(recordsFilter.toLowerCase()) ||
                  item.album.toLowerCase().includes(recordsFilter.toLowerCase())
                );
              })
              .sort((a, b) => {
                if (a.count === b.count) {
                  if (a.albumArtist < b.albumArtist) {
                    return -1;
                  } else if (a.albumArtist > b.albumArtist) {
                    return 1;
                  } else {
                    return a.album < b.album ? -1 : a.album > b.album ? 1 : 0;
                  }
                } else {
                  return b.count - a.count;
                }
              })
              .map((item, index) => {
                return <PlayedData key={index} itemIndex={index} item={item} />;
              })}
        </div>
      </div>
    </div>
  );
}

export default User;
