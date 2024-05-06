import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Home/Navbar";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Collections from "./pages/Collections";
import User from "./pages/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Artist from "./pages/Artist";
import Player from "./components/Home/Player";
import Settings from "./components/Home/Settings";
import { useAuthContext } from "./contexts/AuthContext";
import Notifications from "./components/Home/Notifications";
import { useEffect, useState } from "react";
import PrivateRoute from "./utils/PrivateRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useReleaseContext } from "./contexts/ReleaseContext";
import Album from "./components/Artist/Album";
import NewCollectionName from "./components/Collections/NewCollectionName";
import { useCollectionsContext } from "./contexts/CollectionsContext";
import UserCollectionsList from "./components/Collections/UserCollectionsList";
import MediaPlayer from "./components/Home/MediaPlayer";
import { AnimatePresence } from "framer-motion";

function App() {
  const { showSettings, noticMsg, getUserData, user } = useAuthContext();
  const { showDetails, showModia, play } = useReleaseContext();
  const { showNewCollectionName, showUserCollectionsList } =
    useCollectionsContext();
  const [inactiveTime, setInactiveTime] = useState(0);
  const INACTIVITY_THRESHOLD = 30000;
  const isVisible = inactiveTime > INACTIVITY_THRESHOLD && showModia;

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    const handleActive = () => {
      setInactiveTime(0);
    };
    if (inactiveTime < INACTIVITY_THRESHOLD) {
      window.addEventListener("mousemove", handleActive);
    }
    window.addEventListener("click", handleActive);
    window.addEventListener("keydown", handleActive);
    window.addEventListener("scroll", handleActive);
    const timer = setInterval(() => {
      if (play) {
        setInactiveTime((prevTime) => prevTime + 1000);
      }
    }, 1000);
    return () => {
      if (inactiveTime < INACTIVITY_THRESHOLD) {
        window.removeEventListener("mousemove", handleActive);
      }
      window.removeEventListener("click", handleActive);
      window.removeEventListener("keydown", handleActive);
      window.removeEventListener("scroll", handleActive);
      clearInterval(timer);
    };
  }, [inactiveTime, play]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home isVisible={isVisible} />} key="/" />
        <Route
          path="/music"
          element={<Music isVisible={isVisible} />}
          key="/music"
        />
        <Route path="/artist/:id" element={<Artist />} key="/artist/:id" />
        <Route element={<PrivateRoute />}>
          <Route
            path="/collections"
            element={<Collections />}
            key="/collections"
          />
          <Route
            path="/user/:userName"
            element={<User isVisible={isVisible} />}
            key="/user/:userName"
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showUserCollectionsList && <UserCollectionsList />}
      {showNewCollectionName && <NewCollectionName />}
      <AnimatePresence exit={{ duration: 0.3 }}>
        {showDetails && <Album />}
      </AnimatePresence>
      <AnimatePresence exit={{ duration: 0.3 }}>
        {noticMsg && <Notifications />}
      </AnimatePresence>
      <AnimatePresence exit={{ duration: 0.3 }}>
        {showSettings && user && <Settings />}
      </AnimatePresence>

      <Player />
      {inactiveTime > INACTIVITY_THRESHOLD && showModia && <MediaPlayer />}
    </div>
  );
}

export default App;
