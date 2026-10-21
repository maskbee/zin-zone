-- Cloudflare D1 Database Schema for Zin Zone Licenses
-- Table: licenses

CREATE TABLE IF NOT EXISTS licenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE' or 'REVOKED'
  device_id TEXT,
  created_at INTEGER NOT NULL,
  activated_at INTEGER,
  order_note TEXT
);

CREATE INDEX IF NOT EXISTS idx_licenses_code ON licenses(code);
CREATE INDEX IF NOT EXISTS idx_licenses_device ON licenses(device_id);
CREATE INDEX IF NOT EXISTS idx_licenses_status ON licenses(status);
