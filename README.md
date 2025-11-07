# 🎓 Joineazy Assignment Management System

> **A modern, role-based assignment management system built with React + TypeScript + Tailwind CSS**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://assignment-management-system-indol.vercel.app/login)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

A production-ready frontend application that enables professors to create and manage course assignments with real-time analytics, while providing students with an intuitive interface to track assignments and acknowledge submissions with smart group-based logic.

---

## ✨ Features

### 🎯 Core Functionality

- **🔐 Role-Based Authentication**
  - JWT-based login/register with automatic role detection
  - Secure session management with Zustand
  - Protected routes with authentication guards

- **👨‍🏫 Professor Dashboard**
  - View all courses with student counts
  - Create, edit, and delete assignments
  - Real-time submission analytics with progress bars
  - Form validation with React Hook Form + Zod

- **👨‍🎓 Student Dashboard**
  - View enrolled courses and assignments
  - Individual assignment acknowledgment (one-click)
  - Smart group submission logic (leader-only)
  - Visual progress tracking

- **🤝 Advanced Group Management**
  - Individual vs. Group submission types
  - Leader-only acknowledgment for group assignments
  - No-group warning with helpful UX guidance

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **pnpm**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/assignmnet-managemnet-system.git
cd joineazy-frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server with mock API
npm run dev:mock
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Testing

### Test Credentials

#### Professor Account
- **Email:** `prof@demo.edu` (or any email containing "prof")
- **Password:** Any password
- **Dashboard:** `/professor`

#### Student Account
- **Email:** `student@demo.edu` (or any other email)
- **Password:** Any password
- **Dashboard:** `/`

### Test Flows

**Professor Flow:**
1. Login with professor email
2. View courses (CS301, CS305)
3. Click "Manage assignments" on any course
4. Create new assignment with validation
5. Edit/delete assignments
6. View progress analytics

**Student Flow:**
1. Login with student email
2. View enrolled courses
3. Select a course to view assignments
4. Acknowledge individual assignments
5. For group assignments, only leaders can acknowledge
6. View real-time progress updates

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18.3, TypeScript 5.6, Vite 7.1 |
| **Styling** | Tailwind CSS v3, @tailwindcss/forms |
| **State** | Zustand 5.0, React Hook Form 7.66 |
| **Validation** | Zod 4.1 |
| **HTTP** | Axios 1.13 with JWT interceptor |
| **Icons** | Lucide React |
| **Notifications** | Sonner |
| **Mocking** | MSW 2.11 (Mock Service Worker) |
| **Routing** | React Router v6 |
| **Build** | Vite with TypeScript |
| **Linting** | ESLint, TypeScript ESLint |

---

## 📁 Project Structure

```
joineazy-frontend/
├── public/
│   └── mockServiceWorker.js       # MSW service worker
├── src/
│   ├── main.tsx                   # App entry point
│   ├── pages/
│   │   ├── auth/                  # Login & Register
│   │   ├── professor/             # Professor dashboard & assignment management
│   │   └── student/               # Student dashboard & assignment list
│   ├── components/                # Reusable UI components
│   │   ├── CourseCard.tsx
│   │   ├── AssignmentCard.tsx
│   │   ├── AssignmentForm.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Badge.tsx
│   │   ├── Loader.tsx
│   │   └── ...
│   ├── routes/
│   │   ├── router.tsx             # Route definitions
│   │   └── guards/                # Auth guards
│   ├── layouts/
│   │   ├── AppLayout.tsx          # Main app layout
│   │   └── AuthLayout.tsx         # Auth pages layout
│   ├── api/
│   │   ├── http.ts                # Axios instance
│   │   ├── auth.api.ts            # Auth endpoints
│   │   ├── courses.api.ts         # Courses endpoints
│   │   ├── assignments.api.ts     # Assignments endpoints
│   │   └── groups.api.ts          # Groups endpoints
│   ├── store/
│   │   └── auth.store.ts          # Zustand auth store
│   ├── utils/
│   │   ├── roles.ts               # Role helpers
│   │   ├── cn.ts                  # Class name utility
│   │   └── date.ts                # Date formatters
│   ├── mocks/
│   │   ├── browser.ts             # MSW setup
│   │   └── handlers.ts            # API mock handlers
│   └── styles/
│       └── index.css              # Global styles + Tailwind
├── .env.example                   # Environment template
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎨 Design System

### Colors

**Brand Colors:**
- Primary: `#1470ef` (brand-600)
- Primary Hover: `#0f5cc1` (brand-500)
- Surface: `#ffffff` (white)
- Background: `#fcfcf9` (cream-50)

**Status Colors:**
- Success: `#218c8d` (teal)
- Error: `#c0152f` (red)
- Warning: `#a84b2f` (orange)
- Info: `#626c71` (slate)

### Typography

- **Font Family:** System fonts (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
- **Base Size:** 14px
- **Headings:** 24px (h1), 20px (h2), 18px (h3), 16px (h4)
- **Line Height:** 1.5 (body), 1.2 (headings)

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
# API Configuration
VITE_API_BASE_URL=/api

# Mock Service Worker (set to true for demo mode)
VITE_USE_MSW=true

# App Branding
VITE_APP_NAME=Joineazy AMS
```

For production deployment with a real backend:
```env
VITE_API_BASE_URL=https://your-backend-api.com/api
VITE_USE_MSW=false
```

### Available Scripts

```bash
# Development with mock API
npm run dev:mock

# Development (uses .env value for MSW)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Configure build settings:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Node Version:** 18.x

4. Add `vercel.json` for SPA routing:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

<p align="center">
  Made with ❤️ by <a href="https://github.com/yourusername">Mihir Patel</a>
</p>

<p align="center">
  <a href="#-joineazy-assignment-management-system">Back to Top ↑</a>
</p>
