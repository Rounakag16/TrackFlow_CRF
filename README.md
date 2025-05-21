# TrackFlow CRM – Day 1 Setup

## 🛠 Tech Stack
- **Backend**: Node.js + Express
- **Frontend**: HTML, CSS, JS
- **Database**: PostgreSQL

## 🚀 Setup Instructions

1. Clone this repo
2. Create `.env` with your PostgreSQL `DATABASE_URL`
3. Run `npm install`
4. Initialize DB (optional): `node backend/setupDb.js`
5. Start server: `node backend/server.js`
6. Open `frontend/index.html` in your browser

## 📊 Database Schema

### leads
- id, name, contact, company, product_interest, stage, follow_up_date, notes

### orders
- id, lead_id (FK), status, dispatch_date, courier, tracking_info
