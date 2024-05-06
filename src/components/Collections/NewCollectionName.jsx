import "./NewCollectionName.css";
import { useCollectionsContext } from "../../contexts/CollectionsContext";
import { motion } from "framer-motion";

function NewCollectionName() {
  const {
    setShowNewCollectionName,
    newCollection,
    setNewCollection,
    addNewCollection,
  } = useCollectionsContext();

  const handleNewCollection = (e) => {
    e.preventDefault();
    addNewCollection();
  };

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
      className="NewCollectionNameWrapper"
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
      >
        <form onSubmit={handleNewCollection} className="NewCollectionName">
          <h3>New Collection title</h3>
          <input
            type="text"
            name="CollectionTitle"
            id="CollectionTitle"
            placeholder="Collection Title..."
            onChange={(e) =>
              setNewCollection({ ...newCollection, title: e.target.value })
            }
            required
            autoFocus
          />
          <div className="NewCollectionNameBtns">
            <button type="submit">Create Collection</button>
            <button
              type="button"
              onClick={() => setShowNewCollectionName(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default NewCollectionName;
