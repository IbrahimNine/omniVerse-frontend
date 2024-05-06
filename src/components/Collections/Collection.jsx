import { useState } from "react";
import { useCollectionsContext } from "../../contexts/CollectionsContext";
import "./Collection.css";
import { handleNext, handlePrevious } from "../../utils/sliderHandlers";
import Confirmation from "./Confirmation";
import { motion } from "framer-motion";
import CollectionItem from "./CollectionItem";

function Collection({ collection, index }) {
  const { deleteCollection, updateCollectionTitle } = useCollectionsContext();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showTitleEditor, setShowTitleEditor] = useState(false);
  const [newTitle, setNewTitle] = useState(collection.title);

  return (
    <>
      <motion.div
        initial={{ y: "40%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="CollectionWrapper"
        style={{
          backgroundColor:
            index % 2 !== 0
              ? "rgba(174, 205, 255, 0.041)"
              : "rgba(174, 205, 255, 0.01)",
        }}
      >
        <div className="CollectionHeader">
          {showTitleEditor ? (
            <div className="titleEditorForm">
              <input
                type="text"
                id="titleEditor"
                className="titleEditor"
                defaultValue={collection.title}
                required
                placeholder="New collection name.."
                autoFocus
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  updateCollectionTitle(collection, newTitle);
                  setShowTitleEditor(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  >
                    <path
                      strokeDasharray={60}
                      strokeDashoffset={60}
                      d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.5s"
                        values="60;0"
                      ></animate>
                    </path>
                    <path
                      strokeDasharray={14}
                      strokeDashoffset={14}
                      d="M8 12L11 15L16 10"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.6s"
                        dur="0.2s"
                        values="14;0"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </button>
              <button type="button" onClick={() => setShowTitleEditor(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth={2}
                  >
                    <path
                      strokeDasharray={60}
                      strokeDashoffset={60}
                      d="M5.63604 5.63603C9.15076 2.12131 14.8492 2.12131 18.364 5.63603C21.8787 9.15075 21.8787 14.8492 18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364C2.12132 14.8492 2.12132 9.15075 5.63604 5.63603Z"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.5s"
                        values="60;0"
                      ></animate>
                    </path>
                    <path
                      strokeDasharray={18}
                      strokeDashoffset={18}
                      d="M6 6L18 18"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.6s"
                        dur="0.2s"
                        values="18;0"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </button>
            </div>
          ) : (
            <h2>
              {collection.title}
              <abbr title="Edit Collection name" className="editBtn">
                <button type="button" onClick={() => setShowTitleEditor(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="0.8em"
                    height="0.8em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M21.455 5.416a.75.75 0 0 1-.096.943l-9.193 9.192a.75.75 0 0 1-.34.195l-3.829 1a.75.75 0 0 1-.915-.915l1-3.828a.778.778 0 0 1 .161-.312L17.47 2.47a.75.75 0 0 1 1.06 0l2.829 2.828a.756.756 0 0 1 .096.118m-1.687.412L18 4.061l-8.518 8.518l-.625 2.393l2.393-.625z"
                      clipRule="evenodd"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M19.641 17.16a44.4 44.4 0 0 0 .261-7.04a.403.403 0 0 1 .117-.3l.984-.984a.198.198 0 0 1 .338.127a45.91 45.91 0 0 1-.21 8.372c-.236 2.022-1.86 3.607-3.873 3.832a47.77 47.77 0 0 1-10.516 0c-2.012-.225-3.637-1.81-3.873-3.832a45.922 45.922 0 0 1 0-10.67c.236-2.022 1.86-3.607 3.873-3.832a47.75 47.75 0 0 1 7.989-.213a.2.2 0 0 1 .128.34l-.993.992a.402.402 0 0 1-.297.117a46.164 46.164 0 0 0-6.66.255a2.89 2.89 0 0 0-2.55 2.516a44.421 44.421 0 0 0 0 10.32a2.89 2.89 0 0 0 2.55 2.516c3.355.375 6.827.375 10.183 0a2.89 2.89 0 0 0 2.55-2.516"
                    ></path>
                  </svg>
                </button>
              </abbr>
            </h2>
          )}

          <abbr title="Delete Collection" className="deleteBtn">
            <button type="button" onClick={() => setShowConfirmation(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18 6h4m-.6 14H2.6a.6.6 0 0 1-.6-.6V11h19.4a.6.6 0 0 1 .6.6v7.8a.6.6 0 0 1-.6.6M2 11V4.6a.6.6 0 0 1 .6-.6h6.178a.6.6 0 0 1 .39.144l3.164 2.712a.6.6 0 0 0 .39.144H14"
                ></path>
              </svg>
            </button>
          </abbr>
        </div>
        <div className="collectionBody">
          <button
            type="button"
            className="previousBtn"
            onClick={() => handlePrevious(setSliderPosition, sliderPosition)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.5em"
              height="2.5em"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z"
              ></path>
            </svg>
          </button>
          <div className="FirstLayerWrapper">
            <div
              className="Collection"
              style={{ transform: `translateX(${sliderPosition}px)` }}
            >
              {collection.elements.map((item, index) => {
                return (
                  <CollectionItem
                    key={index}
                    item={item}
                    collection={collection}
                  />
                );
              })}
            </div>
          </div>
          <button
            type="button"
            className="nextBtn"
            onClick={() => handleNext(setSliderPosition, sliderPosition, index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.5em"
              height="2.5em"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"
              ></path>
            </svg>
          </button>
        </div>
      </motion.div>
      {showConfirmation && (
        <Confirmation
          setShowConfirmation={setShowConfirmation}
          deleteCollection={deleteCollection}
          collectionID={collection._id}
        />
      )}
    </>
  );
}

export default Collection;
