// db.js — SQLite database setup for Code Quest
// Uses better-sqlite3: a single portable file, no external DB server needed.
const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'codequest.db');
const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  provider TEXT NOT NULL DEFAULT 'email',   -- 'email' or 'google'
  password_hash TEXT,                        -- null for google accounts
  username TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '🙂',
  xp INTEGER NOT NULL DEFAULT 0,
  coins INTEGER NOT NULL DEFAULT 0,
  completed TEXT NOT NULL DEFAULT '[]',       -- JSON array
  achievements TEXT NOT NULL DEFAULT '[]',    -- JSON array
  referral_code TEXT UNIQUE,
  invited_by TEXT,                            -- referral_code of inviter, if any
  invites_accepted INTEGER NOT NULL DEFAULT 0,
  level1_unlocked INTEGER NOT NULL DEFAULT 0,  -- 0/1
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_referral ON users(referral_code);
`);

module.exports = db;
