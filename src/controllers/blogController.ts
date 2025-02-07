import { Request, Response } from "express";
import { blogService } from "../services/blogServices";

export class blogController {
  static createBlog = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const userId = (req as any).user._id;

      data["userId"] = userId;

      if (!req.file) {
        res.status(400).json({ message: "please upload image" });
        return;
      }
      const image = req.file.path;
      data.image = image;
      const blog = await blogService.createBlog(data);
      if (!blog) {
        res.status(404).json({ message: "Enable to create blog" });
      }

      res.status(blog.status).json({ message: blog.message });
    } catch (error: any) {
      res.status(500).json({ error: `Error ${error.message} happened` });
    }
  };

  static updateBlog = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const userId = (req as any).user._id;
      const blogId = (req as any).params.blogId;

      data["userId"] = userId;

      const imageUrl = req.file?.path;
      if (!imageUrl) {
        res.status(404).json({ message: "Image required" });
      }
      data.image = imageUrl;

      const updatedBlog = await blogService.updateBlog(data, blogId);
      console.log("Updated blog", updatedBlog);
      if (!updatedBlog) {
        res.status(404).json({ message: "Enable to update blog" });
      }

      res
        .status(updatedBlog.status)
        .json({ message: updatedBlog.message, userId: userId });
    } catch (error: any) {
      res.status(500).json({ error: `Error ${error.message} happened` });
    }
  };

  static deleteBlog = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id;
      const blogId = (req as any).params.blogId;

      const deletedBlog = await blogService.deleteBlog(userId, blogId);
      console.log("deletedBlog", deletedBlog);
      res.status(deletedBlog.status).json({ message: deletedBlog.message });
    } catch (error: any) {
      res.status(500).json({ error: `Error ${error.message} happened` });
    }
  };

  static getAllBlogs = async (req: Request, res: Response) => {
    try {
      const allBlogs = await blogService.getAllBlogs();
      res.status(allBlogs.status).json(allBlogs.data);
    } catch (error: any) {
      res.status(500).json({ error: `Error ${error.message} happened` });
    }
  };

  static getSingleBlog = async (req: Request, res: Response) => {
    const blogId = (req as any).params.blogId;
    console.log("blogId controller", blogId);
    try {
      const singleBlog = await blogService.getSingleBlog(blogId);
      res.status(singleBlog.status).json(singleBlog.data);
    } catch (error: any) {
      res.status(500).json({ error: `Error ${error.message} happened` });
    }
  };

  static getBlogByUserId = async (req: Request, res: Response) => {
    const userId = (req as any).user._id;
    const blogId = (req as any).params.blogId;
    try {
      const userBlog = await blogService.getBlogByUserId(blogId, userId);
      res.status(userBlog.status).json(userBlog.data);
    } catch (error: any) {
      res.status(500).json({ error: `Error ${error.message} happened` });
    }
  };
}
