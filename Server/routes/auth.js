const express = require("express");
const router = express.Router();
const { register, login, getUserDetails } = require("../controllers/user");
const {
  addBookmark,
  getBookmarkedStoriesByUser,
} = require("../controllers/bookmark");
const verifyJwt = require("../middleware/authmiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/userDetails", getUserDetails);
router.post("/bookmark/:id", verifyJwt, addBookmark);
router.get("/bookmarks/:userId", verifyJwt, getBookmarkedStoriesByUser);

module.exports = router;
