
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
    .isAlpha('en-US', { ignore: ' ' }).withMessage('Last name must only contain letters'),

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

export const validateRole = [
  check("role").notEmpty().withMessage('role must be not empty')
    .isIn([
      "developer",
      "President",
      "Project Manager",
      "Quality Assurence",
      "Vice President",
    ])
    .withMessage(
      "invalid you put 'develope', 'President', 'Project Manager', 'Quality Assurence', 'Vice President'"
    ),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];


