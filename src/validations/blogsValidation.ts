import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateBlog = [
    check('title')
        .notEmpty().withMessage('Title is required'),

    check('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),

    check('image')
        .notEmpty().withMessage('Image URL is required')
        .isURL().withMessage('Image URL must be a valid URL'),

    check('images')
        .isArray().withMessage('Images must be an array of strings')
        .custom((value: string[]) => value.length > 0).withMessage('Images array must contain at least one image URL')
        .custom((value: string[]) => value.every(image => typeof image === 'string' && image.trim() !== '')).withMessage('Each image must be a non-empty string'),

    check('comments')
        .optional()
        .isArray().withMessage('Comments must be an array of ObjectId references'),

    check('likes')
        .optional()
        .isInt({ min: 0 }).withMessage('Likes must be a non-negative integer'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
