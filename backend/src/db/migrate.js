const fs = require('fs');
const path = require('path');
const pool = require('./config');

async function runMigrations() {
  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf-8');
    await pool.query(sql);
    console.log(`✓ ${file}`);
  }

  process.exit(0);
}

runMigrations().catch(console.error);
