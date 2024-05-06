import React from "react";
import "./Offcanvas.css";
import { useFiltersContext } from "../../contexts/FiltersContext";
import { genres, countries } from "../../utils/filterData";
import { motion, AnimatePresence } from "framer-motion";

const Offcanvas = ({ visible, setVisible }) => {
  const { setFilterSet, setGlobalSearch, setFilterBy } = useFiltersContext();

  // const handlerFiltersBar = () => {
  //   if (visible) {
  //     const filtersInput = document.querySelector(".filtersInput");
  //     const container = document.querySelector(".contents");
  //     const Offcanvas = document.querySelector(".Offcanvas");
  //     container.style.paddingLeft = "0";
  //     Offcanvas.style.width = "48px";
  //     filtersInput.style.width = "0";

  //     setTimeout(() => {
  //       setVisible(!visible);
  //     }, 300);
  //   } else {
  //     setVisible(!visible);
  //   }
  // };
  // useEffect(() => {
  //   // let delayEffect;
  //   const container = document.querySelector(".contents");
  //   if (visible) {
  //     // const filtersInput = document.querySelector(".filtersInput");

  //     // const Offcanvas = document.querySelector(".Offcanvas");
  //     // delayEffect = setTimeout(() => {
  //     container.style.paddingLeft = "25%";
  //     // Offcanvas.style.minWidth = "25%";
  //     // filtersInput.style.width = "100%";
  //     // }, 0);
  //   }
  //   return () => {
  //     // clearTimeout(delayEffect);
  //     container.style.paddingLeft = "0%";
  //   };
  // }, [visible]);

  const handleFilters = (e) => {
    e.preventDefault();
    const elements = Array.from(e.target.elements);
    let elementsValues = {};
    elements.forEach((item) => {
      if (item.tagName === "INPUT" || item.tagName === "SELECT") {
        elementsValues = { ...elementsValues, [item.name]: item.value };
      }
    });
    setFilterSet(elementsValues);
    setGlobalSearch(elementsValues.title);
    setFilterBy("master");
  };

  const start = 1900;
  const end = new Date().getFullYear();
  const years = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="Offcanvas"
    >
      <AnimatePresence mode="wait">
        {!visible && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            key="offcanvasButton"
          >
            <button
              id="offcanvasButton"
              type="button"
              onClick={() => setVisible(!visible)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3em"
                height="3em"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M529.408 149.376a29.12 29.12 0 0 1 41.728 0a30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672zm256 0a29.12 29.12 0 0 1 41.728 0a30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672z"
                ></path>
              </svg>
            </button>
          </motion.div>
        )}
        {visible && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            key="filtersInput"
            className="filtersInputContainer"
          >
            <form className="filtersInput" onSubmit={handleFilters}>
              <h2>Set your filters:</h2>
              <input placeholder="Album title..." name="title" />
              <select name="style">
                <option value="">Genre...</option>
                {genres.sort().map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select name="country">
                <option value="">Country...</option>
                {countries.sort().map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select name="year">
                <option value="">Year...</option>
                {years.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button type="Submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.94em"
                  height="2em"
                  viewBox="0 0 15 16"
                >
                  <path
                    fill="currentColor"
                    d="M12.49 7.14L3.44 2.27c-.76-.41-1.64.3-1.4 1.13l1.24 4.34c.05.18.05.36 0 .54l-1.24 4.34c-.24.83.64 1.54 1.4 1.13l9.05-4.87a.98.98 0 0 0 0-1.72Z"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                id="sweepoutfilter"
                onClick={() => setVisible(!visible)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
                  ></path>
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Offcanvas;
