# PrimeTrade.ai Internship Assignment

**Submitted by:** Nikhil Chittaboina  
**Role:** Frontend / Backend Developer Intern  

---

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Scalability & Security Notes](#scalability--security-notes)
- [Optional Features](#optional-features)

---

## Project Overview

This is a **full-stack application** demonstrating:

- **Backend:** User authentication, role-based access, task CRUD, API validation, and JWT security.
- **Frontend:** React.js app with separate components for Register, Login, and Tasks.
- **Goal:** Build a scalable, secure, and functional backend with a simple frontend for demonstration.

---

## Core Features

### Backend (Primary Focus)

- User registration & login APIs with **password hashing** and **JWT authentication**
- **Role-based access control** (user vs admin)
- **CRUD operations** for tasks
- **API versioning** (`/api/v1/...`)
- Input validation & error handling
- Database schema in MongoDB
- Optional scalability notes for caching & deployment

### Frontend (Supportive)

- React.js components:
  - `Register.jsx` → user registration
  - `Login.jsx` → login with JWT
  - `Tasks.jsx` → protected tasks dashboard
- JWT stored in **localStorage** for session persistence
- **Logout functionality**
- Error and success messages displayed
- Component-level styling (CSS)

---

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **Frontend:** React.js, Fetch API, CSS
- **Optional / Future-ready:** Redis caching, Docker deployment

---

## Project Structure

```
backend/
├── controllers/
│   └── task.controller.js
├── middlewares/
│   ├── auth.middleware.js
│   └── role.middleware.js
├── models/
│   ├── task.model.js
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   └── task.routes.js
├── server.js
└── package.json

frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── Register.jsx
│   │   ├── Register.css
│   │   ├── Tasks.jsx
│   │   └── Tasks.css
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## Setup & Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Set JWT_SECRET and MongoDB connection string in .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- Frontend runs at `http://localhost:5173` (or specified port)
- Backend runs at `http://localhost:5000`

---

## Running the Application

1. Register a new user via `/api/v1/auth/register`
2. Login via `/api/v1/auth/login`
3. Access tasks dashboard (`Tasks.jsx`)
4. Add, delete, or view tasks
5. Logout using the Logout button

---

## API Documentation

**Postman Collection:** `PrimeTradeAI_Assignment.postman_collection.json` (included in repo)

**Base URL:** `http://localhost:5000/api/v1`

### API Endpoints

| Endpoint | Method | Description |
|:---------|:-------|:------------|
| `/auth/register` | `POST` | Register a new user |
| `/auth/login` | `POST` | Login and receive JWT |
| `/tasks` | `GET` | Fetch all tasks (JWT required) |
| `/tasks` | `POST` | Create a new task (JWT required) |
| `/tasks/:id` | `PUT` | Update a task (JWT required) |
| `/tasks/:id` | `DELETE` | Delete a task (**Admin only**) |

### Example Request Bodies

#### Register User

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"
}
```

#### Login User

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Create Task

```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "pending"
}
```

---

## Scalability & Security Notes

- **Stateless JWT authentication** allows horizontal scaling
- **Modular backend structure** makes it easy to add new modules or features
- **Input validation & sanitization** prevent invalid data
- **Optional caching** can be implemented with Redis for performance
- **Logging & Docker deployment** readiness considered for production
- **Password hashing** using bcrypt for secure credential storage
- **Role-based access control** for granular permissions

---

## Optional Features

- ✅ Redis caching for frequently accessed tasks
- ✅ Swagger UI for interactive API documentation
- ✅ Docker deployment for production-ready architecture
- ✅ Rate limiting for API endpoints
- ✅ Request logging with Morgan

---

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/primetrade
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

---

## Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

---

## License

This project is created for the PrimeTrade.ai internship assignment.

---

## Author

**Nikhil Chittaboina**  
Frontend/Backend Developer Intern Applicant

**Contact:**  
- GitHub: [https://github.com/nikhil-chittaboina]
- Email: [itznikkichittaboina@gmail.com]
- LinkedIn: [https://www.linkedin.com/in/nikhilchittaboina/]

---

## Acknowledgments

- PrimeTrade.ai for the internship opportunity
- Node.js and React.js communities for excellent documentation
