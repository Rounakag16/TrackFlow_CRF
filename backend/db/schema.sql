-- Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  contact VARCHAR(100),
  company VARCHAR(100),
  product_interest TEXT,
  stage VARCHAR(50),
  follow_up_date DATE,
  notes TEXT
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
  status VARCHAR(50),
  dispatch_date DATE,
  courier TEXT,
  tracking_info TEXT
);
