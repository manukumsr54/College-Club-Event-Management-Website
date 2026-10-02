# CodeChef Student Chapter — College Event Management Website

A modern , full-stack event discovery, registration, and chapter administration platform built with **React.js**, **Node.js**, **Express.js**, **Tailwind CSS**, and **PostgreSQL**.

---

## 🌟 Project Overview

The **CodeChef Student Chapter** is a modern collegiate competitive programming and technical society platform that empowers students to discover, explore, and register for coding contests, DSA bootcamps, technical hackathons, algorithm challenges, and workshops. The platform bridges student participants with chapter administrators through real-time relational data persistence, robust input validation, and secure authentication.

---

## 🚀 Key Features

### 🎓 Student & Public Experience
- **Dynamic Hero & Brand Story**: Engaging introduction highlighting the club's mission, core pillars, activities, and student participation guidelines.
- **Spotlight Featured Event**: Dynamically queried hero showcase for flagship club events with attendance tracking.
- **Comprehensive Event Catalog (`/events`)**:
  - Live full-text search across event titles and descriptions.
  - Multi-category filtering (*Technical*, *Workshop*, *Competition*, *Seminar*, *Cultural*, *Sports*, *Other*).
  - Synchronized search and category filters with instant reset.
- **Dedicated Event Landing Pages (`/events/:id`)**: High-resolution banners, attendee guidelines, date/time/venue badges, and direct registration CTAs.
- **Real-Time Registration Engine**:
  - Validated fields: Name, Email, College/University, Academic Year, Phone Number.
  - **Duplicate Prevention**: Rejects duplicate registrations for the same student email and event in PostgreSQL.
  - **Digital Admission Pass**: Instant ticket generation showing Pass ID, student details, and event summary upon confirmation.
- **About & Community Hub (`/about`)**: Core committee leads showcase, club vision, and interactive FAQs.
- **Campus Helpdesk & Inquiries (`/contact`)**: Headquarters location, contact information, and message submission.

### 🛡️ Admin Management Dashboard
- **Secure Admin Authentication (`/admin/login`)**:
  - Encrypted password hashing with **bcryptjs** (10 salt rounds).
  - Stateless **JWT (JSON Web Token)** authorization with bearer token headers.
  - Protected API routes and client-side route guards.
- **Dashboard Overview (`/admin/dashboard`)**:
  - Real-time stat cards: *Total Events*, *Upcoming Events*, *Total Registrations*, *Featured Event*.
  - Recent events roster with student enrollment counts.
  - Category breakdown distribution.
- **Full Event CRUD Operations (`/admin/events`)**:
  - **Add Event**: Title, description, category, date, time, venue, image URL, and featured toggle.
  - **Edit Event**: Modify existing event details with live database sync.
  - **Delete Event**: Safe deletion with custom confirm dialog and foreign-key cascade handling.
  - **Direct Filter Link**: Jump directly to filtered student registrations for any event.
- **Student Registration Management (`/admin/registrations`)**:
  - Live roster table showing student name, email, college, year, phone, and registered event.
  - Multi-criteria filtering by event and academic year.
  - Search across student names, emails, colleges, and event titles.
  - **CSV Export**: One-click roster download formatted for spreadsheet management.
  - Individual registration cancellation with confirmation dialog.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, React Router DOM, Lucide Icons, Axios |
| **Backend** | Node.js, Express.js, REST API Architecture, CORS, Express-Validator |
| **Database** | PostgreSQL 18, Relational Schema, Foreign Keys (`ON DELETE CASCADE`), Indexes |
| **Security** | bcryptjs, JSON Web Tokens (JWT), Parameterized SQL Queries |

---

## 📁 Project Structure

```
college-club-events/
├── backend/
│   ├── config/
│   │   └── db.js                 # PostgreSQL connection pool & helpers
│   ├── controllers/
│   │   ├── authController.js     # Admin login, logout, profile
│   │   ├── eventController.js    # Public & Admin Event CRUD
│   │   ├── registrationController.js # Student registration & admin view
│   │   └── statsController.js    # Dashboard analytics & breakdown
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT Bearer token verification
│   │   ├── errorHandler.js       # Centralized error & 404 handler
│   │   └── validator.js          # Express-validator request rules
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── registrationRoutes.js
│   │   └── statsRoutes.js
│   ├── scripts/
│   │   ├── seedRunner.js         # Automated DB migration & seed runner
│   │   └── testIntegration.js    # End-to-end integration test suite
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Main Express server entrypoint
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/            # AdminSidebar, DashboardCard, EventTable, etc.
│   │   │   ├── common/           # Navbar, Footer, Modal, ConfirmDialog, etc.
│   │   │   ├── events/           # EventCard, EventGrid, FeaturedEvent, SearchBar, etc.
│   │   │   └── home/             # Hero, ClubIntro
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx   # Admin authentication state provider
│   │   │   └── ToastContext.jsx  # Floating toast notifications provider
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx   # Admin dashboard shell with sidebar
│   │   │   └── PublicLayout.jsx  # Public website shell with navbar/footer
│   │   ├── pages/
│   │   │   ├── admin/            # AdminLoginPage, AdminDashboard, AdminEvents, etc.
│   │   │   ├── HomePage.jsx
│   │   │   ├── EventsPage.jsx
│   │   │   ├── EventDetailPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── services/             # Axios API services (events, registrations, auth)
│   │   ├── utils/                # Constants, color maps, date formatters
│   │   ├── App.jsx
│   │   ├── index.css             # Tailwind base & glassmorphic utilities
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── database/
│   ├── schema.sql                # PostgreSQL DDL table definitions & triggers
│   └── seed.sql                  # Realistic sample events, registrations & admin
├── .env.example
├── README.md
└── package.json                  # Root runner scripts
```

---

## ⚙️ Requirements

- **Node.js**: v18.0.0 or higher (v24 LTS recommended)
- **PostgreSQL**: v14.0 or higher
- **npm**: v9.0.0 or higher

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd college-club-events
```

### 2. Database Setup

1. Open PostgreSQL (`psql` or pgAdmin) and create the database:
   ```sql
   CREATE DATABASE college_club_events;
   ```

2. Run the database schema and seed data:
   ```bash
   # From root directory:
   npm --prefix backend run seed
   ```
   *Alternatively via psql:*
   ```bash
   psql -U postgres -d college_club_events -f database/schema.sql
   psql -U postgres -d college_club_events -f database/seed.sql
   ```

### 3. Backend Setup

1. Navigate to `backend` and install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Configure environment variables in `backend/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173

   # PostgreSQL credentials
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/college_club_events

   # JWT secret
   JWT_SECRET=super_secret_college_club_jwt_key_2026_secure
   JWT_EXPIRES_IN=7d
   ```

3. Start the backend development server:
   ```bash
   npm run dev
   # Server runs at http://localhost:5000
   ```

### 4. Frontend Setup

1. Open a new terminal, navigate to `frontend`, and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   # App runs at http://localhost:5173
   ```

---

## 🔑 Demo Admin Credentials

For evaluation and demonstration purposes:

| Field | Value |
| :--- | :--- |
| **Login URL** | `http://localhost:5173/admin/login` |
| **Email** | `admin@collegeclub.edu` |
| **Password** | `Admin@123` |
| **Feature** | The login screen includes an **"Auto Fill"** helper button for instant one-click login. |

---

## 🧪 Automated Integration Testing

The project includes an end-to-end integration test suite that verifies all 16 critical full-stack paths:
```bash
cd backend
node scripts/testIntegration.js
```

**Verifications performed:**
- Public API health check (`GET /api/health`)
- Seeded event querying & schema integrity (`GET /api/events`)
- Category & search keyword filtering (`GET /api/events?category=...&search=...`)
- Single event details retrieval (`GET /api/events/:id`)
- Student registration insertion (`POST /api/registrations`)
- Duplicate registration rejection (HTTP 409 Conflict)
- Admin bcrypt authentication & JWT issuance (`POST /api/auth/login`)
- Protected admin session verification (`GET /api/auth/me`)
- Real-time dashboard statistics (`GET /api/stats/dashboard`)
- Admin Event creation (`POST /api/events`)
- Admin Event update (`PUT /api/events/:id`)
- Admin Event deletion (`DELETE /api/events/:id`)
- Admin registration listing & CSV export validation
- Registration deletion (`DELETE /api/registrations/:id`)

---

## 🔒 Security & Best Practices

- **Password Hashing**: Passwords stored as salted bcrypt hashes with `bcryptjs`.
- **Protected Routes**: Middleware verifies JWT signatures on all `/api/events` (POST, PUT, DELETE), `/api/registrations` (GET, DELETE), and `/api/stats` routes.
- **SQL Parameterization**: All PostgreSQL queries use parameterized placeholders (`$1, $2...`) to prevent SQL injection vulnerabilities.
- **Robust Error Handling**: Structured JSON error formatting with consistent `{ success, message, data }` responses.
- **Responsive Layout**: Designed for seamless usability on desktop (1440px+), laptops, tablets (768px), and mobile devices (375px+).
- **Graceful Fallbacks**: Fallback banner images and error boundaries protect against broken third-party image URLs or network blips.
