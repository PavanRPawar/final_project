import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Register from "../Register/Register";
import SignIn from "../SignIn/SignIn";
import bookmarkIcon from "../../assets/bookmarkIcon.png";
import hamburger from "../../assets/hamburger.png";
import crossIcon from "../../assets/cross.png";
import avatar from "../../assets/avatar.png";
import AddStory from "../Addstory/PushStory";
import { swiptoryContext } from "../../Context/Context";

const Navbar = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [auth, setAuth] = useState(false);
  const [logoutPop, setLogoutPop] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [navmodal, setNavModal] = useState(false);
  const navigate = useNavigate();
  const { showAddStory, setShowAddStory } = useContext(swiptoryContext);

  const { userDetails } = useContext(swiptoryContext);
  console.log(userDetails?.username);
  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowSignIn(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const adjustedWidth =
        window.innerWidth -
        (window.innerWidth > document.documentElement.clientWidth
          ? window.innerWidth - document.documentElement.clientWidth
          : 0);
      setInnerWidth(adjustedWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignClick = () => {
    setShowSignIn((prev) => !prev);
    setShowRegister(false);
  };

  const handleClickMbHam = () => {
    setNavModal(!navmodal);
  };

  const handleAddStoryClick = () => {
    setShowAddStory(!showAddStory);
  };

  const HandleOnClickHamburgerIcon = () => {
    setLogoutPop(!logoutPop);
  };

  const handleOnClickLogout = () => {
    localStorage.clear();
    navigate(0);
  };

  return (
    <div className={styles.Navbar}>
      <h1 className={styles.Navbar_Heading}>SwipTory</h1>

      {localStorage.getItem("userId") ? (
        <div className={styles.navcontainer}>
          <div className={styles.bookmarkbtn}>
            <img
              src={bookmarkIcon}
              alt="Bookmark"
              className={styles.bookmark_img}
            />
            <p className={styles.bookmarks}>Bookmarks</p>
          </div>
          <button className={styles.addstory} onClick={handleAddStoryClick}>
            Add Story
          </button>
          <img src={avatar} className={styles.avatar} alt="avatar" />
          <img
            src={hamburger}
            className={styles.hamburger}
            alt="hamburger"
            onClick={HandleOnClickHamburgerIcon}
          />
          {logoutPop && (
            <div className={styles.overlay_logout_navbar}>
              <h1 className={styles.your_name}>{userDetails.username}</h1>
              <button className={styles.logout} onClick={handleOnClickLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.navbar_btn}>
          <button className={styles.register} onClick={handleRegisterClick}>
            Register Now
          </button>
          <button className={styles.signin} onClick={handleSignClick}>
            Sign In
          </button>
          {showRegister && (
            <Register
              showRegister={showRegister}
              setShowRegister={setShowRegister}
            />
          )}
          {showSignIn && (
            <SignIn showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
          )}
        </div>
      )}

      {showAddStory && (
        <AddStory
          showAddStory={showAddStory}
          setShowAddStory={setShowAddStory}
        />
      )}

      {!auth && innerWidth <= 500 && (
        <div className={styles.mobileNavMenu}>
          <div className={styles.navbar_btn} onClick={handleClickMbHam}>
            <img src={hamburger} alt="" className={styles.hamburger} />
          </div>
          {navmodal && (
            <div className={styles.login_sign_in_section}>
              <div className={styles.mb_close} onClick={handleClickMbHam}>
                <img src={crossIcon} alt="" className={styles.x_icon} />
              </div>
              <div className={styles.navbar_btn}>
                <button
                  className={styles.register}
                  onClick={handleRegisterClick}>
                  Register Now
                </button>
                <button className={styles.signin} onClick={handleSignClick}>
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
