const { query } = require('../config/db');

// Register for an event (Public)
const registerForEvent = async (req, res, next) => {
  try {
    const { event_id, name, email, college, year, phone } = req.body;

    // Check if event exists
    const eventResult = await query(
      'SELECT id, title, date, venue FROM events WHERE id = $1',
      [event_id]
    );

    if (eventResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found or has been removed.',
      });
    }

    const event = eventResult.rows[0];

    // Check for duplicate registration with same email + event
    const duplicateCheck = await query(
      'SELECT id FROM registrations WHERE event_id = $1 AND LOWER(email) = LOWER($2)',
      [event_id, email.trim()]
    );

    if (duplicateCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: `You are already registered for "${event.title}" with this email (${email}).`,
      });
    }

    // Insert registration
    const insertResult = await query(
      `INSERT INTO registrations (event_id, name, email, college, year, phone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, event_id, name, email, college, year, phone, created_at`,
      [event_id, name.trim(), email.trim().toLowerCase(), college.trim(), year.trim(), phone.trim()]
    );

    const registration = insertResult.rows[0];

    res.status(201).json({
      success: true,
      data: {
        ...registration,
        event_title: event.title,
        event_date: event.date,
        event_venue: event.venue,
      },
      message: "Registration successful! You're all set for the event.",
    });
  } catch (error) {
    next(error);
  }
};

// Get all registrations with filtering (Admin only)
const getAllRegistrations = async (req, res, next) => {
  try {
    const { search, eventId, year } = req.query;

    let sql = `
      SELECT 
        r.id,
        r.event_id,
        r.name,
        r.email,
        r.college,
        r.year,
        r.phone,
        r.created_at,
        e.title AS event_title,
        e.date AS event_date,
        e.category AS event_category
      FROM registrations r
      JOIN events e ON r.event_id = e.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    // Filter by event ID
    if (eventId && eventId !== 'all') {
      sql += ` AND r.event_id = $${paramIndex++}`;
      params.push(parseInt(eventId, 10));
    }

    // Filter by year
    if (year && year !== 'all') {
      sql += ` AND LOWER(r.year) = LOWER($${paramIndex++})`;
      params.push(year);
    }

    // Search query across student name, email, college, and event title
    if (search && search.trim() !== '') {
      sql += ` AND (
        LOWER(r.name) LIKE LOWER($${paramIndex}) OR
        LOWER(r.email) LIKE LOWER($${paramIndex}) OR
        LOWER(r.college) LIKE LOWER($${paramIndex}) OR
        LOWER(e.title) LIKE LOWER($${paramIndex})
      )`;
      params.push(`%${search.trim()}%`);
      paramIndex++;
    }

    sql += ` ORDER BY r.created_at DESC`;

    const result = await query(sql, params);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
      message: 'Registrations retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get registrations by specific event (Admin only)
const getRegistrationsByEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const result = await query(
      `SELECT 
        r.id,
        r.event_id,
        r.name,
        r.email,
        r.college,
        r.year,
        r.phone,
        r.created_at,
        e.title AS event_title
       FROM registrations r
       JOIN events e ON r.event_id = e.id
       WHERE r.event_id = $1
       ORDER BY r.created_at DESC`,
      [eventId]
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
      message: `Registrations for event ${eventId} fetched successfully`,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a registration (Admin only)
const deleteRegistration = async (req, res, next) => {
  try {
    const { id } = req.params;

    const checkResult = await query(
      'SELECT id, name, email FROM registrations WHERE id = $1',
      [id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Registration with ID ${id} not found`,
      });
    }

    await query('DELETE FROM registrations WHERE id = $1', [id]);

    res.status(200).json({
      success: true,
      message: `Registration for ${checkResult.rows[0].name} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerForEvent,
  getAllRegistrations,
  getRegistrationsByEvent,
  deleteRegistration,
};
