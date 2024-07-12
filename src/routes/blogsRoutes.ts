import express from "express";
import { isLoggedIn } from "../middleware/authentication";
import { blogController } from "../controllers/blogController";
import { validateBlog } from "../validations/blogsValidation";

export const blogRouter = express.Router();

blogRouter.post("/createBlog", isLoggedIn, validateBlog, blogController.createBlog);
blogRouter.patch("/updateBlog/:blogId", isLoggedIn, blogController.updateBlog);
blogRouter.delete("/deleteBlog/:blogId", isLoggedIn, blogController.deleteBlog);