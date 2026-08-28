const express = require("express");
const { createBlog, publishBlog } = require("../controllers/blogController");
const router = express.Router();
router.post("/", createBlog);
router.patch("/:id/publish", publishBlog);
module.exports = router;
