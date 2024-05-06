import { useState } from "react";
import "./Settings.css";
import GeneralSettings from "./GeneralSettings";
import DeletionSettings from "./DeletionSettings";
import PwSettings from "./PwSettings";
import { AnimatePresence, motion } from "framer-motion";

function Settings() {
  const [showPwSettings, setShowPwSettings] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deletePW, setDeletePW] = useState();

  // const handleUpdatePw = (e) => {
  //   setUpdatePw({ ...updatePw, [e.target.name]: e.target.value });
  // };

  // function isValidImageFile(fileName) {
  //   const validExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
  //   const fileExtension = fileName.split(".").pop().toLowerCase();
  //   return validExtensions.includes(fileExtension);
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const picFile = document.querySelector("#userPic");

  //   const nameInput = document.querySelector("#newName");
  //   if (nameInput.value === "") {
  //     nameInput.value = nameInput.defaultValue;
  //   }
  //   const emailInput = document.querySelector("#newEmail");
  //   if (emailInput.name === "") {
  //     emailInput.value = emailInput.defaultValue;
  //   }
  //   const updatedUser = {};
  //   if (
  //     picFile.value !== null && picFile.files[0]
  //       ? isValidImageFile(picFile.files[0].name)
  //       : false
  //   ) {
  //     updatedUser[picFile.name] = picFile.files[0];
  //   }
  //   updatedUser[nameInput.name] = nameInput.value;
  //   updatedUser[emailInput.name] = emailInput.value;

  //   updateUser(updatedUser);
  // };

  // const handleResetProfilePic = () => {
  //   if (!updateLoading) {
  //     const picFile = document.getElementById("userPic");
  //     if (picFile.files[0]) {
  //       picFile.value = null;
  //     }
  //   }
  //   updateUserPic();
  // };

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
      className="SettingsWrapper"
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
        <AnimatePresence mode="wait">
          {!showPwSettings ? (
            !showDelete ? (
              <GeneralSettings
                key="GeneralSettings"
                setShowPwSettings={setShowPwSettings}
                setShowDelete={setShowDelete}
              />
            ) : (
              //____________________delete account_________________________________
              <DeletionSettings
                key="DeletionSettings"
                deletePW={deletePW}
                setDeletePW={setDeletePW}
                setShowDelete={setShowDelete}
              />
            )
          ) : (
            //_____________________change password_________________________________
            <PwSettings
              key="PwSettings"
              setShowPwSettings={setShowPwSettings}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default Settings;
