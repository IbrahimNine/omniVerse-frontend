import React, { useEffect, useState } from "react";
import Offcanvas from "../components/Music/Offcanvas";
import FilteredItems from "../components/Music/FilteredItems";
import { useFiltersContext } from "../contexts/FiltersContext";
import { motion, AnimatePresence } from "framer-motion";
import "./Music.css";

function Music() {
  const { filterBy, setFilterBy } = useFiltersContext();
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const buttons = document.querySelectorAll(".FilteringBtns button");
    buttons.forEach((button) => {
      if (button.id === filterBy) {
        button.style.backgroundColor = "white";
        button.style.color = "black";
      } else {
        button.style.backgroundColor = "black";
        button.style.color = "white";
      }
    });
  }, [filterBy]);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `Music | ${document.title}`;
    return () => {
      document.title = originalTitle;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="Music">
      <Offcanvas visible={visible} setVisible={setVisible} />
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ paddingLeft: 0 }}
          animate={{ paddingLeft: visible && !isMobile ? "25%" : 0 }}
          transition={{ duration: 0.5 }}
          className="contents"
          key="contents"
        >
          <div className="FilteringBtns">
            <button
              id="artist"
              type="button"
              onClick={() => setFilterBy("artist")}
            >
              Artists
            </button>
            <button
              id="master"
              type="button"
              onClick={() => setFilterBy("master")}
            >
              Albums
            </button>
          </div>
          <FilteredItems />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Music;
