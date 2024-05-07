import { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [noticMsg, setNoticMsg] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_SERVER_BASE_URL;

  //________________________________________________________________________________________
  const authLogin = (signInCord) => {
    setLoading(true);
    axios
      .post(
        `${baseURL}/api/auth/login`,
        { ...signInCord },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setUser(res.data.data);
          navigate("/music");
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  //________________________________________________________________________________________
  const authRegister = (signInCord) => {
    setLoading(true);
    axios
      .post(
        `${baseURL}/api/auth/register`,
        { ...signInCord },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setUser(res.data.data);

          navigate("/music");
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  //________________________________________________________________________________________
  const authLogout = () => {
    axios
      .delete(`${baseURL}/api/auth/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setUser(null);
          navigate("/");
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  //________________________________________________________________________________________
  const getUserData = useCallback(() => {
    axios
      .get(`${baseURL}/api/user`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setUser(res.data.data);
        } else if (res.data.status === "fail") {
          setUser(null);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setUser(null);
        } else {
          console.log(err);
        }
      });
  }, [baseURL]);

  //________________________________________________________________________________________
  const deleteUser = (password) => {
    setDeleteLoading(true);
    axios
      .post(
        `${baseURL}/api/user/delete`,
        { ...password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setNoticMsg(res.data.data);
          setShowSettings(false);
          navigate("/");
          setUser(null);
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };
  //________________________________________________________________________________________
  const updateUser = (userCord) => {
    setUpdateLoading(true);

    const formData = new FormData();
    Object.entries(userCord).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .put(`${baseURL}/api/user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setNoticMsg(res.data.message);
          setShowSettings(false);
          getUserData();
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  //________________________________________________________________________________________
  const updateUserPic = () => {
    axios
      .delete(`${baseURL}/api/user/profilePic`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setNoticMsg(res.data.message);
          getUserData();
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //________________________________________________________________________________________
  const updatePassword = (password) => {
    setUpdateLoading(true);
    axios
      .put(
        `${baseURL}/api/user/password`,
        { ...password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setNoticMsg(res.data.data);
          setShowSettings(false);
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLogin,
        authRegister,
        loading,
        authLogout,
        showSettings,
        setShowSettings,
        noticMsg,
        setNoticMsg,
        getUserData,
        deleteUser,
        deleteLoading,
        updateUser,
        updateLoading,
        updatePassword,
        updateUserPic,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
