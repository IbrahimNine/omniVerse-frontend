import React, { useEffect, useState } from "react";
import "./OnQueue.css";
import axios from "axios";
import { motion } from "framer-motion";
import { useReleaseContext } from "../../contexts/ReleaseContext";

function OnQueue() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { showTracks } = useReleaseContext();
  const baseURL = process.env.REACT_APP_SERVER_BASE_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/api/user/onqueuetracks`, { withCredentials: true })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          setError(true);
        }
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [baseURL]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5 }}
      className="OnQueueWrapper"
    >
      <h3>Recent listened tracks:</h3>
      <div className="OnQueue">
        {loading ? (
          // error? <p>You're not logged in, Plaese try to login and play some music</p>:
          <img
            src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif"
            alt="loading"
            width={50}
            className="onQueueLoadingTotal"
          />
        ) : error ? (
          <p>No Tracks to show, Please try to login and play some music</p>
        ) : data.length > 0 ? (
          data.map((track, index) => (
            <div
              key={index}
              className="onQueueTrack"
              onClick={() => showTracks({ id: track.trackAlbumID })}
            >
              <p className="trackDetails">
                {track.trackArtist.split(/[()]/)[0].trim()} - {track.trackTitle}
              </p>
              <span>
                <p>{track.playedTime}</p>
                <p>{track.playedDate}</p>
              </span>
            </div>
          ))
        ) : (
          <p>
            You didn't play any music yet, Please search and jam your favorite
            records
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default OnQueue;
