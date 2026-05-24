# ☀️ ESCANOR — Full-Stack MERN Application

This project is a personal milestone where I successfully rebuilt and upgraded my frontend application from the [week_10_react-assessment](https://github.com/AshaJenvasu/week_10_react-assessment) to seamlessly connect with the robust Node.js/Express backend server that I built alongside the instructor in class ([week_11_JSD12-Full-Stack-Backend](https://github.com/AshaJenvasu/week_11_JSD12-Full-Stack-Backend)).

🔗 **Live Demo:** [week-12-react-assessment-rebuild.vercel.app](https://week-12-react-assessment-rebuild.vercel.app/)

---

## ⚡ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, React Router DOM, React Context API |
| **Backend** | Node.js, Express.js, JWT (JSON Web Tokens) |
| **Database** | MongoDB, Mongoose |
| **Deployment** | Vercel (Frontend) |

---

## 🔑 Key Features

### 1. Authentication & Role-Based Access Control
- **Auto-Login on Register:** After successful account creation, the app silently fires a login request in the background — users land directly in the app without re-entering credentials.
- **RBAC with Dynamic UI:** Client-side and server-side route guards work together. The navbar dynamically renders an `Admin` or `User` badge based on global auth state.
- **Unified Auth Screen:** Login and Sign-Up share a single container with smooth state-driven toggling — no page reload, no jarring transitions.

### 2. State Management & Persistent Sessions
- **Global Auth Context (`AuthContext.jsx`):** Single source of truth for user state, error notifications (`authError`), and loading indicators (`authLoading`) via the React Context API.
- **Session Recovery on Refresh:** On every page load, the app silently calls the `/api/v2/users/auth/me` endpoint with credentials to restore the active session — eliminating the common "session drop on F5" problem.

### 3. Theming & Easter Eggs
- **Dark/Gold UI Theme:** Custom Tailwind configuration with gradient effects, hover animations, and glow properties inspired by Escanor's aesthetic from *Nanatsu no Taizai*.
- **Audio Easter Egg:** Upon entering the Owner panel, a character voice line plays once via the Web Audio API — triggered through React's `useEffect` mounting lifecycle.

---

## 🛠️ Debugging Chronicle

Real challenges encountered and solved during development.

### Challenge 1: Session Loss on Page Refresh (404 on `/auth/me`)

**Symptom:** Every page refresh dropped the user back to the login screen despite an active backend cookie. The F12 Network tab showed `404 Not Found` on the session check request.

**Root Cause:** The frontend was calling a generic `/api/v2/auth/me` endpoint, but the class-built backend scoped all user routes under `/users` — making the correct path `/api/v2/users/auth/me`.

**Fix:** Corrected the endpoint URL in `checkSession` and aligned the response destructuring (`data.user`) to match the backend's actual payload structure.

---

### Challenge 2: White Space Below Footer on Short Pages

**Symptom:** On pages with minimal content (e.g., the Owner panel), a thick white block appeared below the dark-themed footer — the browser's default background bleeding through.

**Root Cause:** The layout container didn't expand to fill the full viewport height when content was short, letting the default white background show beneath the custom footer.

**Fix:** Set `background-color: #000000 !important` at the root level in `index.css`, then applied `min-h-screen`, `flex-col`, and `flex-grow` on the main layout wrapper to pin the footer to the bottom regardless of content height.

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- MongoDB URI (local or Atlas)

### 1. Backend

```bash
cd week_11_JSD12-Full-Stack-Backend
npm install
```

Create a `.env` file:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev
```

### 2. Frontend

```bash
cd week_10_react-assessment
npm install
npm run dev
```

App runs at `http://localhost:5173` — backend expected at `http://localhost:3000`.

---

## 🎨 Credits
Character & motif inspired by Nakaba Suzuki's *The Seven Deadly Sins (Nanatsu no Taizai)*.
