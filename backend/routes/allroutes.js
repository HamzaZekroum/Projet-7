const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const {
  createPost,
  modifyPost,
  deletePost,
  getAllPosts,
  getOnePost,
  vote,
  likes
} = require("../controllers/postsControllers");
const { signup, login } = require("../controllers/userControllers");



router.post("/api/posts",  auth, multer,  createPost);
router.put("/api/posts/:id", auth, multer,  modifyPost);
router.delete("/api/posts/:id", auth, deletePost);
router.get("/api/posts",   auth, getAllPosts);
router.get("/api/posts/:id", auth, vote,  getOnePost);


router.post("/api/auth/signup", signup);
router.post("/api/auth/login", login);

router.post("/api/posts/:id/like", auth, likes, vote);

module.exports = router;
