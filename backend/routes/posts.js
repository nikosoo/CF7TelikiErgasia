// routes/posts.js

import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  addComment,
  deletePost,
  deleteComment, // Import the deleteComment controller
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, addComment);

/* DELETE */
router.delete("/:id", verifyToken, deletePost);
router.delete("/:postId/comment", verifyToken, deleteComment); // Add this line to handle comment deletion

export default router;
