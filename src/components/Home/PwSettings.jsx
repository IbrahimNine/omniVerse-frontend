import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

function PwSettings({ setShowPwSettings }) {
  const { updateLoading, updatePassword } = useAuthContext();
  const [updatePw, setUpdatePw] = useState();

  const handleUpdatePw = (e) => {
    setUpdatePw({ ...updatePw, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <form
        className="Settings"
        onSubmit={(e) => {
          e.preventDefault();
          updatePassword(updatePw);
        }}
      >
        <h2>Settings - Password </h2>
        <input
          type="password"
          name="oldPassword"
          id="password"
          defaultValue={""}
          placeholder="Old password.."
          required
          onChange={handleUpdatePw}
          autoFocus
        />
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          defaultValue={""}
          placeholder="New password.."
          required
          autoComplete="on"
          onChange={handleUpdatePw}
        />
        <div className="SettingsBtns">
          <button type="submit">
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
          <button type="button" onClick={() => setShowPwSettings(false)}>
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default PwSettings;
