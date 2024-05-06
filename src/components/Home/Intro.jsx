import React from "react";
import "./Intro.css";
import { motion } from "framer-motion";

function Intro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.9,
        ease: "easeOut",
      }}
      className="intro"
      style={{ backgroundImage: "url(/introBgPic.gif)" }}
    >
      <h2>
        Escape the endless stream. Own your sound. (or) Ditch the shuffle, build
        your sonic sanctuary.
      </h2>
      <span>
        Forget fleeting playlists. At omniVerse,{" "}
        <b>you own the music you love .</b> Build your digital record
        collection, explore hidden gems, and delve into genres you crave.
      </span>{" "}
      <p></p>
      <span>
        <b>No more algorithms. </b>
        You control the journey. Dive deep with your own filters to find that
        perfect record or unearth the next big thing.
      </span>
      <p></p>
      <span>
        <b>Experience the music. </b>
        Immerse yourself in the full fidelity of every song. Stream or download
        your collection in glorious high-resolution audio, perfect for any
        listening session.<p></p>
      </span>
      <span>
        <b>Discover. Collect. Experience.</b> It's the music lover's manifesto.
        Unleash your inner audiophile.
      </span>
    </motion.div>
  );
}

export default Intro;
