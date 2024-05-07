import React, { useState } from "react";
import "./Album.css";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import { Link } from "react-router-dom";
import Track from "./Track";
import { useCollectionsContext } from "../../contexts/CollectionsContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import imgErrorHandler from "../../utils/imgErrorHandler";

function Album() {
  const {
    releaseCord,
    releaseData,
    showDetails,
    setShowDetails,
    loadingAlbum,
  } = useReleaseContext();
  const { user } = useAuthContext();
  const {
    setShowNewCollectionName,
    setNewCollection,
    setShowUserCollectionsList,
    setItemToCollect,
  } = useCollectionsContext();
  const [isLoading, setIsLoading] = useState(true);

  const handleShowDetails = (e) => {
    if (e.target.className === "contentsWrapper Album") {
      setShowDetails(!showDetails);
    }
  };

  const bgStyling = {
    backgroundImage: `url(${
      releaseData?.images && !loadingAlbum && releaseData.images[0]?.uri
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  function generateArtistLinks(artists) {
    return artists.map((artist, index) => (
      <React.Fragment key={index}>
        <Link
          to={`/artist/${artist?.id}`}
          onClick={() => setShowDetails(!showDetails)}
        >
          <h2>{artist.name.trim()}</h2>
        </Link>
        {index !== artists.length - 1 && " / "}
      </React.Fragment>
    ));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className="contentsWrapper Album"
      onClick={handleShowDetails}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          y: "100%",
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="releaseTrackListWrapper "
        style={bgStyling}
      >
        <div className="fakeLayer">
          {releaseData && !loadingAlbum ? (
            <>
              <div className="releaseDetails">
                {/* <ImageWithFallback
                  src={
                    releaseData.images && releaseData.images[0]?.uri
                      ? releaseData.images && releaseData.images[0]?.uri
                      : "/default3.png"
                  }
                  initialImage="/default3.png"
                  fallback={releaseData.images && releaseData.images[0]?.uri}
                  fallbackDelay={70000}
                  alt="pic"
                  id="albumCover"
                /> */}
                <img
                  id="albumCover"
                  src="/Default3.png"
                  alt="Album cover"
                  style={{
                    display: isLoading ? "block" : "none",
                  }}
                />
                <img
                  id="albumCover"
                  src={
                    releaseData.images && releaseData.images[0]?.uri
                      ? releaseData.images && releaseData.images[0]?.uri
                      : "/Default3.png"
                  }
                  alt="Album cover"
                  style={{
                    display: isLoading ? "none" : "block",
                  }}
                  onLoad={() => setIsLoading(false)}
                  onError={(e) => imgErrorHandler(e)}
                />
                <div className="albumGenerals">
                  <div className="albumTitleAndArtist">
                    <h3>{releaseData.title}</h3>
                    {releaseCord &&
                      releaseData &&
                      (releaseData?.artists?.length > 1 ||
                      releaseData?.artists_sort?.includes("/") ? (
                        <div className="ArtistName">
                          {generateArtistLinks(releaseData?.artists)}
                        </div>
                      ) : (
                        <Link
                          className="ArtistName"
                          to={`/artist/${releaseData?.artists[0]?.id}`}
                          onClick={() => setShowDetails(!showDetails)}
                        >
                          <h2>
                            {releaseCord.artist
                              ? releaseCord.artist
                              : releaseData.artists_sort}
                          </h2>
                        </Link>
                      ))}
                  </div>
                  <div className="AlbumDetails">
                    <div className="genres">
                      Genre(s):&nbsp;
                      {releaseData.styles?.map((item, i) => (
                        <h5 key={i}>{item} </h5>
                      ))}
                    </div>
                    <h5>Released: {releaseData.released}</h5>
                  </div>
                </div>

                <div className="btns">
                  {user && (
                    <div className="collectionBtns">
                      <abbr title="Add to a new Collection">
                        <button
                          className="bookmarkingBtn"
                          type="button"
                          onClick={() => {
                            setShowNewCollectionName(true);
                            setNewCollection({
                              elements: [
                                {
                                  elementID: `${releaseData.id}`,
                                  elementPic:
                                    releaseData.images &&
                                    releaseData.images[0]?.uri
                                      ? releaseData.images[0]?.uri
                                      : "/Default3.png",
                                  elementTitle: releaseData.title,
                                  isArtist: false,
                                },
                              ],
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2em"
                            height="2em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M16 8h3zM5 8h8.45H13h.35zm.4-2h13.2l-.85-1H6.25zm4.6 6.75l2-1l2 1V8h-4zM14.55 21H5q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675v4.9q-.475-.175-.975-.275T19 11.05V8h-3v3.825q-.875.5-1.525 1.238t-1.025 1.662L12 14l-4 2V8H5v11h8.35q.2.575.5 1.075t.7.925M18 21v-3h-3v-2h3v-3h2v3h3v2h-3v3z"
                            ></path>
                          </svg>
                        </button>
                      </abbr>
                      <abbr title="Add to an existing Collection">
                        <button
                          className="bookmarkingBtn"
                          type="button"
                          onClick={() => {
                            setShowUserCollectionsList(true);
                            setItemToCollect([
                              {
                                elementID: `${releaseData.id}`,
                                elementPic:
                                  releaseData.images &&
                                  releaseData.images[0]?.uri
                                    ? releaseData.images[0]?.uri
                                    : "/Default3.png",
                                elementTitle: releaseData.title,
                                isArtist: false,
                              },
                            ]);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2em"
                            height="2em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M3 21V5.8L5.3 3h13.4L21 5.8v5.625q-.475-.175-.975-.288T19 11.026q-.825 0-1.587.188T16 11.8V8H8v8l4-2l1.45.725q-.2.525-.325 1.088T13 16.975q0 1.125.4 2.163T14.55 21zm15 0v-3h-3v-2h3v-3h2v3h3v2h-3v3zM5.4 6h13.2l-.85-1H6.25z"
                            ></path>
                          </svg>
                        </button>
                      </abbr>
                    </div>
                  )}
                </div>
                <button
                  id="ExitAlbumBtn"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.2em"
                    height="2.2em"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="releaseTrackList">
                {releaseData.tracklist.map((item, index) => (
                  <Track
                    key={index}
                    index={index}
                    item={item}
                    artists_sort={releaseData.artists_sort}
                  />
                ))}
              </div>
            </>
          ) : (
            <img
              src="https://assets.3ds.com/invest/iframe/BS-REX-Interactive-Infographic-source-file/html5_output/assets/images/CIRCLE%20GIF.gif"
              alt=""
              width={"20%"}
              id="loeading-AlbumDetails"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Album;
