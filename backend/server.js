const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const statsRoutes = require('./routes/statsRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
const configuredClientUrls = (process.env.CLIENT_URL || '')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean);

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

const allowedOrigins = [...defaultOrigins, ...configuredClientUrls];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }
      // Explicit allowed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Allow any Vercel deployment preview or production domain
      try {
        const url = new URL(origin);
        if (url.hostname.endsWith('.vercel.app')) {
          return callback(null, true);
        }
      } catch (e) {
        // Invalid URL string, fall through
      }
      // Allow all in non-production
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lightweight request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'test') {
      console.log(`${req.method} ${req.originalUrl} [${res.statusCode}] - ${duration}ms`);
    }
  });
  next();
});

// API Root Information
app.get(['/', '/api'], (req, res) => {
  res.status(200).json({
    success: true,
    message: 'College Club Event Management API is online and operational',
    endpoints: {
      health: '/api/health',
      events: '/api/events',
      registrations: '/api/registrations',
      stats: '/api/stats/dashboard',
      auth: '/api/auth/login',
    },
  });
});

// Health check endpoint (accessible at both /api/health and /health)
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({
    success: true,
    message: 'College Club Events API is healthy and operational',
    timestamp: new Date().toISOString(),
  });
});

// Mount API routes (preserve /api/* routes and support root path rewrites)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/events', eventRoutes);
app.use('/events', eventRoutes);

app.use('/api/registrations', registrationRoutes);
app.use('/registrations', registrationRoutes);

app.use('/api/stats', statsRoutes);
app.use('/stats', statsRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server (for local development via node server.js / npm start / npm run dev)
const startServer = async () => {
  await testConnection();
  const server = app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`  College Club Event Management Backend Running`);
    console.log(`  Port: http://localhost:${PORT}`);
    console.log(`  API Base: http://localhost:${PORT}/api`);
    console.log(`===============================================`);
  });

  return server;
};

if (require.main === module) {
  startServer();
}

module.exports = app;
module.exports.app = app;
module.exports.startServer = startServer;
