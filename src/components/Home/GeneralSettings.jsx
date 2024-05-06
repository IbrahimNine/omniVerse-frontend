import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

function GeneralSettings({ setShowPwSettings, setShowDelete }) {
  const { user, setShowSettings, updateLoading, updateUserPic, updateUser } =
    useAuthContext();
  const [allowSave, setAllowSave] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allowSave) {
      const picFile = document.querySelector("#userPic");

      const nameInput = document.querySelector("#newName");
      if (nameInput.value === "") {
        nameInput.value = nameInput.defaultValue;
      }
      const emailInput = document.querySelector("#newEmail");
      if (emailInput.name === "") {
        emailInput.value = emailInput.defaultValue;
      }
      const updatedUser = {};
      if (
        picFile.value !== null && picFile.files[0]
          ? isValidImageFile(picFile.files[0].name)
          : false
      ) {
        updatedUser[picFile.name] = picFile.files[0];
      }
      updatedUser[nameInput.name] = nameInput.value;
      updatedUser[emailInput.name] = emailInput.value;

      updateUser(updatedUser);
    }
  };

  const handleResetProfilePic = () => {
    if (!updateLoading) {
      const picFile = document.getElementById("userPic");
      const nameInput = document.querySelector("#newName");
      const emailInput = document.querySelector("#newEmail");
      if (picFile.files[0]) {
        picFile.value = null;
        if (
          nameInput.value !== user?.userName ||
          emailInput.value !== user?.userEmail
        ) {
          setAllowSave(false);
        }
      }
    }

    updateUserPic();
  };

  function isValidImageFile(fileName) {
    const validExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const fileExtension = fileName.split(".").pop().toLowerCase();
    return validExtensions.includes(fileExtension);
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <form className="Settings" onSubmit={(e) => handleSubmit(e)}>
        <h2 id="GeneralSettings">Settings - Generals</h2>
        <div className="inputPicLayer">
          <p>Profile picture: </p>
          <input
            type="file"
            name="userPic"
            id="userPic"
            accept=".jpg, .jpeg, .png"
            multiple={false}
            onChange={() => setAllowSave(true)}
          />
          <abbr title="Reset profile picture">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              onClick={handleResetProfilePic}
            >
              <path
                fill="currentColor"
                d="M4 9.77V5h1v3.235q1-1.897 2.851-3.066Q9.701 4 12 4q2.738 0 4.85 1.627q2.11 1.627 2.823 4.142h-1.06q-.696-2.107-2.486-3.438Q14.337 5 12 5Q9.979 5 8.36 6.044Q6.743 7.088 5.909 8.77H8.77v1zm3.5 7.73h9.154l-2.827-3.77l-2.615 3.308l-1.75-2.115zM5.615 21q-.67 0-1.143-.472Q4 20.056 4 19.385v-6.77h1v6.77q0 .269.173.442t.442.173h12.77q.269 0 .442-.173t.173-.442v-6.77h1v6.77q0 .67-.472 1.143q-.472.472-1.143.472z"
              ></path>
            </svg>
          </abbr>
        </div>
        <input
          type="text"
          name="newName"
          id="newName"
          placeholder="new username.."
          defaultValue={user?.userName}
          required
          onChange={() => setAllowSave(true)}
        />
        <input
          type="email"
          name="newEmail"
          id="newEmail"
          placeholder="new e-mail.."
          defaultValue={user?.userEmail}
          required
          onChange={() => setAllowSave(true)}
        />
        <div className="SettingsBtns">
          <button type="submit" id={!allowSave && "unableSubmit"}>
            {updateLoading ? (
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
                    strokeOpacity={0.3}
                    d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="1.3s"
                      values="60;0"
                    ></animate>
                  </path>
                  <path
                    strokeDasharray={15}
                    strokeDashoffset={15}
                    d="M12 3C16.9706 3 21 7.02944 21 12"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.3s"
                      values="15;0"
                    ></animate>
                    <animateTransform
                      attributeName="transform"
                      dur="1.5s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="0 12 12;360 12 12"
                    ></animateTransform>
                  </path>
                </g>
              </svg>
            ) : (
              "Save Changes"
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              !updateLoading && setShowSettings(false);
            }}
          >
            Cancel
          </button>
        </div>
        <div className="SettingsBtns" style={{ marginTop: "0" }}>
          <button type="button" onClick={() => setShowPwSettings(true)}>
            Change Password
          </button>
          <button
            type="button"
            style={{ color: "red" }}
            onClick={() => setShowDelete(true)}
          >
            Delete Account
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default GeneralSettings;
