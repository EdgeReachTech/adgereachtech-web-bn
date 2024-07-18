import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validatePortfolio = [
    check('title')
        .notEmpty().withMessage('Title is required'),

    check('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),

    check('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date'),

    check('images')
        .isArray({ min: 1 }).withMessage('Images must be an array of strings and must contain at least one image'),

    check('linkToRepo')
        .optional()
        .isURL().withMessage('Link to repo must be a valid URL'),

    check('linkToSite')
        .optional()
        .isURL().withMessage('Link to site must be a valid URL'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];