import { useEffect } from "react";
import { useCollectionsContext } from "../../contexts/CollectionsContext";
import "./UserCollectionsList.css";
import { motion } from "framer-motion";

function UserCollectionsList() {
  const {
    getUserCollections,
    collections,
    setShowUserCollectionsList,
    addToExistingCollection,
    itemToCollect,
  } = useCollectionsContext();

  useEffect(() => {
    getUserCollections();
  }, [getUserCollections]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="UserCollectionsListWrapper"
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="UserCollectionsList"
      >
        <h3>Add to Collection</h3>
        <div className="CollectionsListFirstLayerWrapper">
          <div className="CollectionsListSecondLayerWrapper">
            {collections.length > 0
              ? collections.map((collection, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      addToExistingCollection(
                        collection._id,
                        collection.title,
                        itemToCollect,
                        collection.elements
                      )
                    }
                  >
                    {collection.title}
                  </div>
                ))
              : "No Collections Yet"}
          </div>
        </div>
        <button type="button" onClick={() => setShowUserCollectionsList(false)}>
          Cancel
        </button>
      </motion.div>
    </motion.div>
  );
}

export default UserCollectionsList;
