const { query } = require('../config/db');

// Get all events with optional filters (category, search, featured, upcoming)
const getAllEvents = async (req, res, next) => {
  try {
    const { category, search, featured, upcoming, limit } = req.query;

    let sql = `
      SELECT 
        e.*,
        COUNT(r.id)::int AS registration_count
      FROM events e
      LEFT JOIN registrations r ON e.id = r.event_id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    // Filter by category
    if (category && category.toLowerCase() !== 'all') {
      sql += ` AND LOWER(e.category) = LOWER($${paramIndex++})`;
      params.push(category);
    }

    // Search by title or description
    if (search && search.trim() !== '') {
      sql += ` AND (LOWER(e.title) LIKE LOWER($${paramIndex}) OR LOWER(e.description) LIKE LOWER($${paramIndex}))`;
      params.push(`%${search.trim()}%`);
      paramIndex++;
    }

    // Filter by featured
    if (featured !== undefined) {
      sql += ` AND e.featured = $${paramIndex++}`;
      params.push(featured === 'true');
    }

    // Filter by upcoming
    if (upcoming === 'true') {
      sql += ` AND e.date >= CURRENT_DATE`;
    }

    sql += ` GROUP BY e.id ORDER BY e.date ASC, e.time ASC`;

    if (limit) {
      sql += ` LIMIT $${paramIndex++}`;
      params.push(parseInt(limit, 10));
    }

    const result = await query(sql, params);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
      message: 'Events fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get single featured event
const getFeaturedEvent = async (req, res, next) => {
  try {
    const result = await query(`
      SELECT 
        e.*,
        COUNT(r.id)::int AS registration_count
      FROM events e
      LEFT JOIN registrations r ON e.id = r.event_id
      WHERE e.featured = TRUE
      GROUP BY e.id
      ORDER BY e.date ASC
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      // Graceful fallback to next upcoming event if no featured
      const fallbackResult = await query(`
        SELECT 
          e.*,
          COUNT(r.id)::int AS registration_count
        FROM events e
        LEFT JOIN registrations r ON e.id = r.event_id
        WHERE e.date >= CURRENT_DATE
        GROUP BY e.id
        ORDER BY e.date ASC
        LIMIT 1
      `);

      return res.status(200).json({
        success: true,
        data: fallbackResult.rows[0] || null,
        message: fallbackResult.rows[0] ? 'Upcoming event fetched as fallback' : 'No featured or upcoming event found',
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
      message: 'Featured event fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get event by ID
const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(`
      SELECT 
        e.*,
        COUNT(r.id)::int AS registration_count
      FROM events e
      LEFT JOIN registrations r ON e.id = r.event_id
      WHERE e.id = $1
      GROUP BY e.id
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Event with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
      message: 'Event details fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Create new event (Admin only)
const createEvent = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      date,
      time,
      venue,
      image,
      featured = false,
    } = req.body;

    // Fallback image if not provided
    const defaultImage = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
    const eventImage = image && image.trim() !== '' ? image.trim() : defaultImage;

    // If setting as featured, optionally unset other featured events to keep one hero event
    if (featured === true) {
      await query('UPDATE events SET featured = FALSE WHERE featured = TRUE');
    }

    const result = await query(
      `INSERT INTO events (title, description, category, date, time, venue, image, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, description, category, date, time, venue, eventImage, featured]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Event created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Update event (Admin only)
const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      date,
      time,
      venue,
      image,
      featured,
    } = req.body;

    // Check if event exists
    const checkResult = await query('SELECT * FROM events WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Event with ID ${id} not found`,
      });
    }

    // If updating to featured = true, unset other featured
    if (featured === true) {
      await query('UPDATE events SET featured = FALSE WHERE id != $1 AND featured = TRUE', [id]);
    }

    const existing = checkResult.rows[0];
    const updatedTitle = title !== undefined ? title : existing.title;
    const updatedDescription = description !== undefined ? description : existing.description;
    const updatedCategory = category !== undefined ? category : existing.category;
    const updatedDate = date !== undefined ? date : existing.date;
    const updatedTime = time !== undefined ? time : existing.time;
    const updatedVenue = venue !== undefined ? venue : existing.venue;
    const updatedImage = image !== undefined ? image : existing.image;
    const updatedFeatured = featured !== undefined ? featured : existing.featured;

    const result = await query(
      `UPDATE events
       SET title = $1, description = $2, category = $3, date = $4, time = $5, venue = $6, image = $7, featured = $8, updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`,
      [
        updatedTitle,
        updatedDescription,
        updatedCategory,
        updatedDate,
        updatedTime,
        updatedVenue,
        updatedImage,
        updatedFeatured,
        id,
      ]
    );

    res.status(200).json({
      success: true,
      data: result.rows[0],
      message: 'Event updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Delete event (Admin only)
const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Confirm existence
    const checkResult = await query('SELECT title FROM events WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Event with ID ${id} not found`,
      });
    }

    // Delete event (foreign key cascade handles registrations)
    await query('DELETE FROM events WHERE id = $1', [id]);

    res.status(200).json({
      success: true,
      message: `Event "${checkResult.rows[0].title}" deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEvents,
  getFeaturedEvent,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
