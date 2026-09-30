const { query } = require('../config/db');

// Get overall stats for Admin Dashboard
const getDashboardStats = async (req, res, next) => {
  try {
    // 1. Total events
    const totalEventsRes = await query('SELECT COUNT(*)::int as count FROM events');
    const totalEvents = totalEventsRes.rows[0].count;

    // 2. Upcoming events (date >= CURRENT_DATE)
    const upcomingEventsRes = await query('SELECT COUNT(*)::int as count FROM events WHERE date >= CURRENT_DATE');
    const upcomingEvents = upcomingEventsRes.rows[0].count;

    // 3. Total registrations
    const totalRegRes = await query('SELECT COUNT(*)::int as count FROM registrations');
    const totalRegistrations = totalRegRes.rows[0].count;

    // 4. Featured event
    const featuredRes = await query(`
      SELECT 
        e.*,
        COUNT(r.id)::int as registration_count
      FROM events e
      LEFT JOIN registrations r ON e.id = r.event_id
      WHERE e.featured = TRUE
      GROUP BY e.id
      ORDER BY e.date ASC
      LIMIT 1
    `);
    const featuredEvent = featuredRes.rows[0] || null;

    // 5. Recent events (latest 5)
    const recentEventsRes = await query(`
      SELECT 
        e.*,
        COUNT(r.id)::int as registration_count
      FROM events e
      LEFT JOIN registrations r ON e.id = r.event_id
      GROUP BY e.id
      ORDER BY e.date ASC
      LIMIT 5
    `);

    // 6. Category breakdown
    const categoryStatsRes = await query(`
      SELECT category, COUNT(*)::int as count
      FROM events
      GROUP BY category
      ORDER BY count DESC
    `);

    res.status(200).json({
      success: true,
      data: {
        totalEvents,
        upcomingEvents,
        totalRegistrations,
        featuredEvent,
        recentEvents: recentEventsRes.rows,
        categoryStats: categoryStatsRes.rows,
      },
      message: 'Dashboard statistics retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
