import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import "./Notifications.css";
import { motion } from "framer-motion";

function Notifications() {
  const { noticMsg, setNoticMsg } = useAuthContext();

  useEffect(() => {
    const delay1 = setTimeout(() => {
      setNoticMsg("");
    }, 9000);
    return () => {
      clearTimeout(delay1);
    };
  }, [setNoticMsg]);


  return (
    <motion.div
      initial={{x: "100%" }}
      animate={{x: 0 }}
      exit={{x: "100%" }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className="Notifications"
    >
      <div className="notifWrapper">{noticMsg}</div>
    </motion.div>
  );
}

export default Notifications;
