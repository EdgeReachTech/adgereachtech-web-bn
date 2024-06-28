
// codes to validate user written by fiacre
import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateUser = [
  check('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isAlpha().withMessage('First name must only contain letters'),

  check('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isAlpha().withMessage('Last name must only contain letters'),

  check('email')
    .isEmail().withMessage('Email is invalid'),

  check('location')
    .notEmpty().withMessage('Location is required'),

  check('dateOfBirth')
    .optional()
    .isISO8601().withMessage('Date of birth must be a valid date, eg 2000-03-31'),

  check('gender')
    .optional()
    .isIn(['male', 'female']).withMessage('Gender must be either Male or Female'),

  check('password')
    .isStrongPassword().withMessage('Password must be strong, containing special char, Upper case letter and at least 8 words'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateChangeUserPassword = [
  check('newPassword')
    .isStrongPassword().withMessage('Password must be strong, containing special char, Upper case letter and at least 8 words'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validatePortfolio = [
  check('title')
    .notEmpty().withMessage('Title is required'),

  check('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 1000 }).withMessage('Description must be at least 1000 characters long'),

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

// export const createPortfolio = (req: Request, res: Response) => {
//   const portfolioData = req.body;
//   return res.status(200).json({ message: "Portfolio created successfully", portfolioData: portfolioData });
// }