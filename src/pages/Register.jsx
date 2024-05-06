import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function Register() {
  const [userCord, setUserCord] = useState({});
  const { authRegister, loading } = useAuthContext();

  const handleUserCord = (e) => {
    setUserCord({ ...userCord, [e.target.name]: e.target.value });
  };
 
  return (
    <div className="Register">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!loading) {
            authRegister(userCord);
          }
        }}
      >
        <h2>Sign up</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter username here.."
          required
          onChange={handleUserCord}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter e-mail here.."
          required
          onChange={handleUserCord}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password here.."
          autoComplete="on"
          required
          onChange={handleUserCord}
        />
        <button type="submit">
          {loading ? (
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
            "Create an account"
          )}
        </button>
        <p>
          You already have an account? <Link to={"/login"}>Sign-in here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
