import React, { useState } from "react";
import imgErrorHandler from "../../utils/imgErrorHandler";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import { useCollectionsContext } from "../../contexts/CollectionsContext";

function CollectionItem({ item, collection }) {
  const { deleteItemFromCollection } = useCollectionsContext();
  const { showTracks } = useReleaseContext();
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="collection-item">
      <img
        src="/default3.png"
        alt="Album cover"
        style={{
          display: isLoading ? "block" : "none",
        }}
      />
      <img
        src={item.elementPic}
        alt="Album cover"
        style={{
          display: isLoading ? "none" : "block",
        }}
        onLoad={() => setIsLoading(false)}
        onError={(e) => imgErrorHandler(e)}
      />
      <div
        className="collected-item-title"
        onClick={(e) => {
          if (
            e.target.className === "collected-item-title" ||
            e.target.tagName === "H4"
          ) {
            showTracks({ id: item.elementID });
          }
        }}
      >
        <h4>{item.elementTitle}</h4>
        <abbr title="Delete from Collection">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            className="deleteCollectionItem"
            onClick={() =>
              deleteItemFromCollection(collection._id, item._id, collection)
            }
          >
            <path
              fill="currentColor"
              d="M13 19c0 1.1.3 2.12.81 3H6c-1.11 0-2-.89-2-2V4a2 2 0 0 1 2-2h1v7l2.5-1.5L12 9V2h6a2 2 0 0 1 2 2v9.09c-.33-.05-.66-.09-1-.09c-3.31 0-6 2.69-6 6m9.54-2.12l-1.42-1.41L19 17.59l-2.12-2.12l-1.41 1.41L17.59 19l-2.12 2.12l1.41 1.42L19 20.41l2.12 2.13l1.42-1.42L20.41 19z"
            ></path>
          </svg>
        </abbr>
      </div>
    </div>
  );
}

export default CollectionItem;
