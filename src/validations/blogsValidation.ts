import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateBlog = [
  check("title").notEmpty().withMessage("Title is required"),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  check("image")
    .custom((value, { req }) => {
      if (!req.files || req.files.length === 0) {
        throw new Error("Please upload an image");
      }
      if (req.files.length > 1) {
        throw new Error("Only one image can be uploaded");
      }
      return true;
    })
    .withMessage("Image is required"),

  // check("comments")
  //   .optional()
  //   .isArray()
  //   .withMessage("Comments must be an array of ObjectId references"),

  // check("likes")
  //   .optional()
  //   .isInt({ min: 0 })
  //   .withMessage("Likes must be a non-negative integer"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
