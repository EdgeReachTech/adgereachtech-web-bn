import Blog from "../models/Blogs";
import { deleteCloudinaryImage } from "../utils/deleteExistingImage";

export class blogService {
  static createBlog = async (data: any) => {
    
    try {
      const blog = await Blog.create(data);
      if (!blog) {
        return { status: 401, message: "Fail to create blog" };
      }

      return {
        status: 200,
        message: "Blog created",
      };
    } catch (error: any) {
    
      return {
        status: 500,
        message: error.message,
      };
    }
  };

  static updateBlog = async (data: any, blogId: any) => {
    try {
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return { status: 404, message: "Blog not found" };
      }

      // Check authorization
      if (String(blog.userId) !== String(data.userId)) {
        return { status: 403, message: "Unauthorized" };
      }

      // Check and delete urls
      const blogImage = blog.image;
      if (data.image && data.image !== blogImage) {
        await deleteCloudinaryImage(blogImage);
      }

      const updatedBlog = await Blog.findByIdAndUpdate(blogId, data, {
        new: true,
      });
      if (!updatedBlog) {
        return { status: 401, message: "Fail to update blog" };
      }

      return {
        status: 200,
        message: "Blog updated successfully",
        data: updatedBlog,
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  };

  static deleteBlog = async (userId: any, blogId: any) => {
    try {
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return { status: 404, message: "Blog not found" };
      }

      if (String(blog?.userId) !== String(userId)) {
        return { status: 404, message: "Unauthorized" };
      }

      const blogImage = blog.image;
      if (blogImage) {
        await deleteCloudinaryImage(blogImage);
      }

      await Blog.findByIdAndDelete(blogId);

      return {
        status: 200,
        message: "Blog deleted successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  };

  // Fetch blogs
  static getAllBlogs = async () => {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      if (!blogs) return { status: 404, message: "No Blogs found" };

      return {
        status: 200,
        data: blogs,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  };

  static getSingleBlog = async (blogId: string) => {
    try {
      const blog = await Blog.findById(blogId);
      if (!blog) return { status: 404, message: "Blog not found" };

      return {
        status: 200,
        data: blog,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  };

  static getBlogByUserId = async (blogId: string, userId: string) => {
    try {
      const blog = await Blog.findById(blogId);
      if (!blog) return { status: 404, message: "Blog not found" };
      if (String(blog?.userId) !== String(userId))
        return { status: 404, message: "Unauthorized" };

      return {
        status: 200,
        data: blog,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 404,
        message: "Internal Server Error",
      };
    }
  };
}
