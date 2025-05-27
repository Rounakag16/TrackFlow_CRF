# 🚀 TrackFlow CRM

A lightweight CRM built with **Node.js**, **PostgreSQL**, and **Vanilla JS (HTML/CSS/JS)** for managing leads and orders with:

* Lead tracking & stages
* Order workflow management
* Follow-up reminders
* Dashboard with metrics
* Calendar view using FullCalendar.js
* Edit support on separate pages



## 🛠️ Tech Stack
* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **Frontend**: HTML, CSS, JavaScript
* **Calendar**: FullCalendar.js (for follow-ups)

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourname/trackflow-crm.git
cd trackflow-crm
```

### 2. Set Up PostgreSQL

Create a new database (e.g. `trackflow_db`) and run the SQL schema:

```bash
psql -U youruser -d trackflow_db -f backend/db/schema.sql
```

Make sure PostgreSQL is running.

### 3. Configure .env

Create a `.env` file in `/backend`:

```
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/trackflow_db
```

### 4. Start the Backend Server

```bash
cd backend
npm install
node server.js
```

Should show:

```
🚗 Server running at http://localhost:3000
```

## 🌐 Run Frontend

Just open the frontend `index.html` in your browser:

```bash
open frontend/index.html
# or
start frontend/index.html
```

No server needed for frontend – it uses `fetch` to call backend APIs.

## ✅ Features

### 🧹 Lead Management

* Add, edit, list leads
* Track stages: New, Contacted, Qualified, Proposal, Won, Lost
* Follow-up date support
* Stage-based filtering
* Kanban View & List View

### 🚚 Order Management

* Create, edit, update orders
* Linked to leads
* Statuses: Order Received, In Development, Ready to Dispatch, Dispatched
* List and Kanban view

### 🗓️ Dashboard & Reminders

* Total lead & order metrics
* Leads grouped by stage
* Orders grouped by status
* Upcoming & overdue follow-up alerts
* Calendar view for follow-up dates

## 📦 Sample APIs

### Leads

* `POST /api/leads`
* `GET /api/leads?stage=Proposal`
* `PUT /api/leads/:id`

### Orders

* `POST /api/orders`
* `GET /api/orders?status=Dispatched`
* `PUT /api/orders/:id`

### Dashboard

* `GET /api/dashboard`

## 🔐 Optional Extensions

* User authentication (JWT)
* Role-based access control
* Email reminders (using NodeMailer)
* Mobile responsive layout

## 💡 Credits

Developed by Rounak Agarwal
Powered by Node.js, PostgreSQL, and love

## 📜 License

This project is licensed under MIT.
