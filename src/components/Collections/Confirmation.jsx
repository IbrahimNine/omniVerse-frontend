import "./Confirmation.css";
import { motion } from "framer-motion";

function Confirmation({ setShowConfirmation, deleteCollection, collectionID }) {
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
      className="ConfirmationWrapper"
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
        className="Confirmation"
      >
        <p>Are you sure you want to delete this Collection?</p>
        <div className="ConfirmationBtns">
          <button
            type="button"
            onClick={() => {
              deleteCollection(collectionID);
              setShowConfirmation(false);
            }}
          >
            Confirm
          </button>
          <button type="button" onClick={() => setShowConfirmation(false)}>
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Confirmation;
