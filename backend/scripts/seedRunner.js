const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');

async function runSeed() {
  const schemaPath = path.join(__dirname, '../../database/schema.sql');
  const seedPath = path.join(__dirname, '../../database/seed.sql');

  try {
    console.log('Running database schema migration...');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(schemaSql);
    console.log('Database schema applied successfully.');

    console.log('Running database seed insertion...');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    await pool.query(seedSql);
    console.log('Database seeded successfully with initial events, registrations, and admin.');

    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('Error during database seed/migration:', err);
    await pool.end().catch(() => {});
    process.exit(1);
  }
}

runSeed();
