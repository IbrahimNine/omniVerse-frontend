import { createContext, useCallback, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

const CollectionsContext = createContext();
export const useCollectionsContext = () => useContext(CollectionsContext);

//_______________________________________________________________________________
export function CollectionsContextProvider({ children }) {
  const { setNoticMsg } = useAuthContext();
  const baseURL = process.env.REACT_APP_SERVER_BASE_URL;
  const [collections, setCollections] = useState([]);
  const [newCollection, setNewCollection] = useState();
  const [itemToCollect, setItemToCollect] = useState();
  const [showNewCollectionName, setShowNewCollectionName] = useState(false);
  const [showUserCollectionsList, setShowUserCollectionsList] = useState(false);

  const getUserCollections = useCallback(() => {
    axios
      .get(`${baseURL}/api/collections`, { withCredentials: true })
      .then((res) => {
        if (res.data.status === "success") {
          setCollections(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        // setNoticMsg(err);
      });
  }, [baseURL]);

  //_______________________________________________________________________________
  const deleteCollection = (id) => {
    axios
      .delete(`${baseURL}/api/collections/${id}`, { withCredentials: true })
      .then((res) => {
        setNoticMsg(res.data.data);
        getUserCollections();
      })
      .catch((err) => console.log(err));
  };

  //_______________________________________________________________________________
  const addNewCollection = () => {
    axios
      .post(
        `${baseURL}/api/collections/`,
        { ...newCollection },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setNoticMsg(res.data.data);
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setShowNewCollectionName(false));
  };

  //_______________________________________________________________________________
  const deleteItemFromCollection = (id, itemId, collection) => {
    axios
      .put(
        `${baseURL}/api/collections/${id}`,
        {
          ...collection,
          elements: collection.elements.filter((item) => item._id !== itemId),
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setNoticMsg(res.data.data);
          getUserCollections();
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  //_______________________________________________________________________________
  const addToExistingCollection = (id, title, newElement, prevElements) => {
    const match = prevElements.some(
      (prevEl) => prevEl.elementID === newElement[0].elementID
    );
    if (match) {
      setNoticMsg(`${newElement[0].elementTitle} already exists in ${title}`);
    } else {
      axios
        .put(
          `${baseURL}/api/collections/${id}`,
          {
            elements: [...newElement, ...prevElements],
            title,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.status === "success") {
            setNoticMsg(res.data.data);
            setShowUserCollectionsList(false);
          } else if (res.data.status === "fail") {
            setNoticMsg(res.data.data);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  //_______________________________________________________________________________
  const updateCollectionTitle = (collection, newTitle) => {
    if (collection.title !== newTitle) {
      const updatedCollection = { ...collection, title: newTitle };
      axios
        .put(
          `${baseURL}/api/collections/${updatedCollection._id}`,
          updatedCollection,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.status === "success") {
            setNoticMsg(res.data.data);
            getUserCollections();
          } else if (res.data.status === "fail") {
            setNoticMsg(res.data.data);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <CollectionsContext.Provider
      value={{
        getUserCollections,
        collections,
        deleteCollection,
        addNewCollection,
        newCollection,
        setNewCollection,
        showNewCollectionName,
        setShowNewCollectionName,
        deleteItemFromCollection,
        showUserCollectionsList,
        setShowUserCollectionsList,
        addToExistingCollection,
        itemToCollect,
        setItemToCollect,
        updateCollectionTitle,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}
