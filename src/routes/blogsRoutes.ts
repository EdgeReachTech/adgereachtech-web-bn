import express from "express";
import { isLoggedIn } from "../middleware/authentication";
import { blogController } from "../controllers/blogController";
import { validateBlog } from "../validations/blogsValidation";

export const blogRouter = express.Router();

blogRouter.post("/createBlog", isLoggedIn, validateBlog, blogController.createBlog);
/**
 * @swagger
 * /blog/createBlog:
 *   post:
 *     summary: Create a new blog
 *     description: Allows an authenticated user to create a new blog.
 *     security:
 *       - BearerAuth: []  # Assuming you have Bearer token authorization
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'New tech available'
 *               description:
 *                 type: string
 *                 example: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum.'
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: 'thumbnail image for the blog'
 *               
 *     responses:
 *       '200':
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Blog created successfully.'
 *       '400':
 *         description: Invalid input or missing required fields
 *       '500':
 *         description: internal Server error
 */

blogRouter.patch("/updateBlog/:blogId", isLoggedIn, blogController.updateBlog);
blogRouter.delete("/deleteBlog/:blogId", isLoggedIn, blogController.deleteBlog);