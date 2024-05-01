import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "./Banner/Banner";
import styles from "./Home.module.css";
import AllStories from "../components/AllStories/AllStories";
import SwiptoryProvider, { swiptoryContext } from "../Context/Context";
import Slide from "../components/StorySlide/StorySlide";

const Home = () => {
  // const { isSliderOpen } = useContext(swiptoryContext);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  return (
    <SwiptoryProvider>
      <div className={styles.home_container}>
        <Navbar />
        <Banner />
        <AllStories
          isSliderOpen={isSliderOpen}
          setIsSliderOpen={setIsSliderOpen}
        />
      </div>
      {isSliderOpen && (
        <Slide isSliderOpen={isSliderOpen} setIsSliderOpen={setIsSliderOpen} />
      )}
    </SwiptoryProvider>
  );
};

export default Home;
