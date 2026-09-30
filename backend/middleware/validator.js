const { body, validationResult } = require('express-validator');

// Generic result validator
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

// Admin Login validation rules
const loginValidation = [
  body('email').trim().isEmail().withMessage('Please provide a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest,
];

// Event validation rules (Creation)
const eventValidation = [
  body('title').trim().notEmpty().withMessage('Event title is required').isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters'),
  body('description').trim().notEmpty().withMessage('Event description is required').isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  body('category').trim().notEmpty().withMessage('Event category is required'),
  body('date').notEmpty().withMessage('Event date is required').isISO8601().withMessage('Date must be in YYYY-MM-DD format'),
  body('time').trim().notEmpty().withMessage('Event time is required'),
  body('venue').trim().notEmpty().withMessage('Event venue is required').isLength({ min: 2, max: 255 }).withMessage('Venue must be between 2 and 255 characters'),
  body('image').optional({ checkFalsy: true }).trim().isURL().withMessage('Image must be a valid URL'),
  body('featured').optional().isBoolean().withMessage('Featured must be a boolean value'),
  validateRequest,
];

// Event validation rules (Update)
const eventUpdateValidation = [
  body('title').optional().trim().notEmpty().withMessage('Event title cannot be empty').isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters'),
  body('description').optional().trim().notEmpty().withMessage('Event description cannot be empty').isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  body('category').optional().trim().notEmpty().withMessage('Event category cannot be empty'),
  body('date').optional().isISO8601().withMessage('Date must be in YYYY-MM-DD format'),
  body('time').optional().trim().notEmpty().withMessage('Event time cannot be empty'),
  body('venue').optional().trim().notEmpty().withMessage('Event venue cannot be empty').isLength({ min: 2, max: 255 }).withMessage('Venue must be between 2 and 255 characters'),
  body('image').optional({ checkFalsy: true }).trim().isURL().withMessage('Image must be a valid URL'),
  body('featured').optional().isBoolean().withMessage('Featured must be a boolean value'),
  validateRequest,
];

// Registration validation rules
const registrationValidation = [
  body('name').trim().notEmpty().withMessage('Full name is required').isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').trim().notEmpty().withMessage('Email address is required').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('college').trim().notEmpty().withMessage('College/Institution name is required').isLength({ min: 2, max: 255 }).withMessage('College name must be between 2 and 255 characters'),
  body('year').trim().notEmpty().withMessage('Academic year is required'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/)
    .withMessage('Please enter a valid phone number (min 7 digits)'),
  body('event_id').notEmpty().withMessage('Event ID is required').isInt({ min: 1 }).withMessage('Event ID must be a valid integer'),
  validateRequest,
];

module.exports = {
  loginValidation,
  eventValidation,
  eventUpdateValidation,
  registrationValidation,
};
