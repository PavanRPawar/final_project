import React, { useState, createContext, useEffect } from "react";
import { getUserDetails } from "../API/User";
export const swiptoryContext = createContext();

const SwiptoryProvider = ({ children }) => {
  const [filter, setFilter] = useState("all");
  const [userDetails, setUserDetails] = useState();
  const [showAddStory, setShowAddStory] = useState(false);
  const [postClk, setPostClk] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [openedStoryId, setOpenedStoryId] = useState();
  const [openedStorySlides, setOpenedStorySlides] = useState();
  const [postData, setPostData] = useState({
    _id: "",
    slides: [
      {
        heading: "",
        description: "",
        image: "",
        category: "",
      },
      {
        heading: "",
        description: "",
        image: "",
        category: "",
      },
      {
        heading: "",
        description: "",
        image: "",
        category: "",
      },
    ],
  });
  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getUserDetails();
      setUserDetails(details);
    };

    fetchDetails();
  }, []);

  return (
    <swiptoryContext.Provider
      value={{
        filter,
        setFilter,
        userDetails,
        showAddStory,
        setShowAddStory,
        isUpdate,
        setIsUpdate,
        postData,
        setPostData,
        postClk,
        setPostClk,
        openedStoryId,
        setOpenedStoryId,
        openedStorySlides,
        setOpenedStorySlides,
      }}
    >
      {children}
    </swiptoryContext.Provider>
  );
};

export default SwiptoryProvider;
