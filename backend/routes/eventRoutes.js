const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getFeaturedEvent,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const { eventValidation, eventUpdateValidation } = require('../middleware/validator');

// Public routes
router.get('/featured', getFeaturedEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Admin protected routes
router.post('/', authenticateAdmin, eventValidation, createEvent);
router.put('/:id', authenticateAdmin, eventUpdateValidation, updateEvent);
router.delete('/:id', authenticateAdmin, deleteEvent);

module.exports = router;
