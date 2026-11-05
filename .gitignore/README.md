# TaskFlow — MERN Stack To-Do Web Application

A full-stack task management web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with complete end-to-end CRUD operations, priority indicators, real-time filtering, search, and responsive UI design.

---

## 1. Project Architecture

The application is structured into decoupled frontend and backend layers:

- **Frontend (Client):** Single-page React 18 application bundled with Vite. Manages UI state, asynchronous API interactions via Axios, live search/filtering, and responsive task controls.
- **Backend (Server):** Node.js runtime with Express.js REST API server handling request routing, body parsing, CORS headers, and controller logic.
- **Database (Persistence):** MongoDB schema definitions managed via Mongoose ODM, enforcing validation rules, defaults, timestamps, and indexing.

---

## 2. Key Features

- **Create:** Add tasks with title, optional detailed description, priority levels (Low, Medium, High), and due dates.
- **Read:** Retrieve tasks sorted by creation date with status filtering (All, Active, Completed), priority filtering, and keyword search.
- **Update:** Inline editing to modify title, description, priority, or deadline. Toggle task completion status with a single click.
- **Delete:** Remove individual tasks with confirmation dialogs. Clear all completed tasks simultaneously.
- **Telemetry Dashboard:** Live status counters showing total, pending, completed, high-priority counts, and a percentage progress bar.

---

## 3. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18 | Component-based interactive user interface |
| **Build Tool** | Vite 6 | Development server and asset bundling |
| **HTTP Client** | Axios | REST API communication |
| **Backend** | Express 4 / Node.js | REST API routing and middleware |
| **Database** | MongoDB / Mongoose 8 | Document storage and schema modeling |
| **Styling** | Custom CSS3 | Responsive design, flexbox, and CSS grid |

---

## 4. Project Directory Structure

```text
mern_todo_app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── todoController.js
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todoRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskFilter.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskStats.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 5. REST API Specification

| HTTP Method | Endpoint | Description | Request Body | Success Code |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/todos` | Fetch all tasks (supports query filters) | None | `200 OK` |
| `GET` | `/api/todos/:id` | Fetch a single task by ID | None | `200 OK` |
| `POST` | `/api/todos` | Create a new task | `{ title, description, priority, dueDate }` | `201 Created` |
| `PUT` | `/api/todos/:id` | Update task details | `{ title, description, completed, priority, dueDate }` | `200 OK` |
| `PATCH` | `/api/todos/:id/toggle` | Toggle task completion | None | `200 OK` |
| `DELETE` | `/api/todos/:id` | Delete a single task | None | `200 OK` |
| `DELETE` | `/api/todos/clear-completed` | Delete all completed tasks | None | `200 OK` |

---

## 6. Installation & Execution Guide

### Prerequisites
- Node.js (version 18 or higher)
- npm (version 9 or higher)
- MongoDB instance (local service or MongoDB Atlas cluster connection string)

### Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify environment variables in `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/mern_todo_app
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000`.

### Frontend Setup

1. Open a second terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The client application will run on `http://localhost:3000`.

---

## 7. Submission Checklist

- [x] Complete MERN stack implementation (MongoDB, Express, React, Node.js)
- [x] End-to-end CRUD functionality (Create, Read, Update, Delete)
- [x] Input validation on both client and server layers
- [x] Clean, responsive UI with status indicators and search
- [x] Zero comments contained in codebase as required
- [x] Zipped project distribution excluding `node_modules`
