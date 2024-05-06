import "./FullSizePhoto.css";
import { useArtistContext } from "../../contexts/ArtistContext";
import { motion } from "framer-motion";

function FullSizePhoto() {
  const { artistData, showFullSize, setShowFullSize } = useArtistContext();
  const handleShowFullSize = (e) => {
    if (e.target.tagName !== "IMG") {
      setShowFullSize(!showFullSize);
    }
  };
  return (
    <div className="FullSizePhoto" onClick={handleShowFullSize}>
      <motion.div
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
        className="FullSizePhotoImg"
      >
        <img src={artistData.images[0].uri} alt="Full artist pic" />
      </motion.div>
    </div>
  );
}

export default FullSizePhoto;
