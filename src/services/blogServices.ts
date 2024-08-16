import Blog from "../models/Blogs";
import User from "../models/User";

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
            }
        } catch (error: any) {
            console.log(error);
            return {
                status: 500,
                message: "Internal server error"
            };
        }
    }

    static updateBlog = async (data: any, blogId: any) => {
        try {
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return { status: 404, message: "Blog not found" };
            }

            if (String(blog.userId) !== String(data.userId)) {
                return { status: 403, message: "Unauthorized" };
            }


            const updatedBlog = await Blog.findByIdAndUpdate(blogId, data, { new: true });
            if (!updatedBlog) {
                return { status: 401, message: "Fail to update blog" };
            }

            return {
                status: 200,
                message: "Blog updated successfully",
                data: updatedBlog
            };
        } catch (error: any) {
            console.log(error);
            return {
                status: 500,
                message: "Internal server error"
            };
        }
    }

    static deleteBlog = async (userId: any, blogId: any) => {
        try {
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return { status: 404, message: "Blog not found" };
            }

            if (String(blog?.userId) !== String(userId)) {
                return { status: 404, message: "Unauthorized" };
            }

            await Blog.findByIdAndDelete(blogId);

            return {
                status: 200,
                message: "Blog deleted successfully"
            }
        } catch (error: any) {
            console.log(error)
            return {
                status: 500,
                message: "Internal server error"
            }
        }
    }
}