import React, { useEffect, useState } from "react";
import "./Artist.css";
import { Link, useParams } from "react-router-dom";
import Releases from "../components/Artist/Releases";
import FullSizePhoto from "../components/Artist/FullSizePhoto";
import { useArtistContext } from "../contexts/ArtistContext";
import imgErrorHandler from "../utils/imgErrorHandler";


function Artist() {
  const [isLoading, setIsLoading] = useState(true);
  const artistId = useParams().id;
  const {
    fetchMoreReleases,
    isPagedReleases,
    setId,
    artistData,
    artistReleases,
    showFullSize,
    setShowFullSize,
    releasesLoading,
  } = useArtistContext();

  useEffect(() => {
    setId(artistId);
  }, [setId, artistId]);

  useEffect(() => {
    const originalTitle = document.title;
    if (artistData.name !== undefined) {
      document.title = `${artistData.name} | ${document.title}`;
    }
    return () => {
      document.title = originalTitle;
    };
  }, [artistData]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } =
      document.querySelector(".ArtistReleases");
    const offset = 0;
    const hasScrolledToBottom =
      scrollTop + clientHeight + offset >= scrollHeight;
    if (hasScrolledToBottom && isPagedReleases) {
      fetchMoreReleases();
    }
  };

  return (
    <>
      <div className="Artist">
        <aside className="ArtistData" style={{}}>
          {artistData.images ? (
            <>
              <img
                src="/default2.png"
                alt="Artist"
                style={{
                  display: isLoading ? "block" : "none",
                }}
              />
              <img
                src={artistData.images[0].uri}
                alt="Artist"
                onClick={() => setShowFullSize(!showFullSize)}
                style={{
                  display: isLoading ? "none" : "block",
                }}
                onLoad={() => setIsLoading(false)}
                onError={(e) => imgErrorHandler(e)}
              />
            </>
          ) : (
            <img src="/default2.png" alt="Artist" style={{ cursor: "unset" }} />
          )}

          <h3 id="ArtistName">{artistData.name}</h3>
          {artistData.profile && (
            <abbr title={artistData?.profile}>
              <p>
                {artistData.profile.length > 100
                  ? artistData.profile.slice(0, 100) + "..."
                  : artistData.profile}
              </p>
            </abbr>
          )}
          {artistData.aliases && (
            <h4 style={{ margin: "7% 0 0 0", marginTop: "auto" }}>See also:</h4>
          )}
          <div className="RelatedArtists">
            {artistData.aliases &&
              artistData.aliases.map((item, index) => (
                <Link key={index} to={`/artist/${item.id}`}>
                  {item.name}
                </Link>
              ))}
          </div>
        </aside>
        <div className="ArtistReleasesWrapper">
          <section className="ArtistReleases" onScroll={handleScroll}>
            {artistReleases?.map((release, index) => (
              <Releases key={index} release={release} index={index} />
            ))}
            {releasesLoading && (
              <img
                src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif"
                alt="loading"
                width={50}
                className="releasesLoading"
              />
            )}
          </section>
        </div>
      </div>
      {showFullSize && <FullSizePhoto />}
      <div
        className="ArtistWrapper"
        style={{
          backgroundImage: `linear-gradient(to top,#020202 30%,transparent  100%) ,url(${
            artistData?.images ? artistData.images[0].uri : null
          }) `,
        }}
      ></div>
    </>
  );
}

export default Artist;
