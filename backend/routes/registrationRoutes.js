const express = require('express');
const router = express.Router();
const {
  registerForEvent,
  getAllRegistrations,
  getRegistrationsByEvent,
  deleteRegistration,
} = require('../controllers/registrationController');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const { registrationValidation } = require('../middleware/validator');

// Public route to register for an event
router.post('/', registrationValidation, registerForEvent);

// Admin protected routes
router.get('/', authenticateAdmin, getAllRegistrations);
router.get('/event/:eventId', authenticateAdmin, getRegistrationsByEvent);
router.delete('/:id', authenticateAdmin, deleteRegistration);

module.exports = router;
