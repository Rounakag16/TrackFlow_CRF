-- Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact VARCHAR(100) NOT NULL UNIQUE,
  company VARCHAR(100),
  product_interest TEXT,
  stage VARCHAR(50) CHECK (stage IN ('New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost')),
  follow_up_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  status VARCHAR(50) CHECK (status IN ('Order Received', 'In Development', 'Ready to Dispatch', 'Dispatched')),
  dispatch_date DATE,
  courier TEXT,
  tracking_info TEXT,
  UNIQUE (lead_id, tracking_info)
);

