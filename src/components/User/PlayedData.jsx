import React, { useState } from "react";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import imgErrorHandler from "../../utils/imgErrorHandler";

function PlayedData({ item, itemIndex }) {
  const { showTracks } = useReleaseContext();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      key={itemIndex}
      onClick={() => {
        showTracks({ id: item.albumID });
      }}
      className="PlayedData"
      style={{
        backgroundImage: ` radial-gradient(circle, transparent 0.1%, black 100%) ,url(${item.albumPic})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="PlayedDataWrapper">
        <img
          src="/default3.png"
          alt="cover"
          style={{
            display: isLoading ? "block" : "none",
          }}
        />
        <img
          src={item.albumPic}
          alt="cover"
          style={{
            display: isLoading ? "none" : "block",
          }}
          onLoad={() => setIsLoading(false)}
          onError={(e) => imgErrorHandler(e)}
        />
        <p className="recordDetails">
          {item.albumArtist} - <strong>{item.album}</strong>
        </p>
        <p>{item.count} Listens</p>
      </div>
    </div>
  );
}

export default PlayedData;
