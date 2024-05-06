import React, { useEffect } from "react";
import "./Collections.css"
import { useCollectionsContext } from "../contexts/CollectionsContext";
import Collection from "../components/Collections/Collection";


function Collections() {
  const { getUserCollections, collections } = useCollectionsContext();
  useEffect(() => {
    getUserCollections();
  }, [getUserCollections]);

  useEffect(() => {
    const originalTitle = document.title;
      document.title = `My Collections | ${document.title}`;
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <div className="Collections">
      <div className="collectionsWrapper">
        <div className="collections-container">
          {collections.length > 0 ? (
            collections.map((collection, index) => (
              <Collection key={index} collection={collection} index={index} />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              No Collections yet,
              <br /> Go to your favorite artists and start collecting their best
              records 🎵
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collections;
