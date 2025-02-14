import cloudinary from "../config/cloudinary";

export async function deleteCloudinaryImage(blogImage: string) {
  try {
    const imagePublicId = blogImage.split("/upload/")[1].split(".")[0];
    if (imagePublicId) {
      await cloudinary.uploader.destroy(blogImage);
    }
  } catch (error) {
    console.log(error);
  }
}
