const express = require("express");
const verifyJwt = require("../middleware/authmiddleware");
const {
  createStory,
  editStory,
  getStoryById,
  getAllStories,
} = require("../controllers/story");
const { likeStory } = require("../controllers/like");

const router = express.Router();

router.post("/create", verifyJwt, createStory);
router.put("/edit/:id", verifyJwt, editStory);
router.get("/getById/:id", getStoryById);
router.get("/", getAllStories);
router.put("/like/:id", verifyJwt, likeStory);

module.exports = router;
