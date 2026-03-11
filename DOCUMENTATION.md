# 📖 Build Your Portfolio — Technical Documentation

> Comprehensive technical reference for developers working on the **Build Your Portfolio** project.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Development Environment](#development-environment)
- [Frontend (Client)](#frontend-client)
  - [Routing](#routing)
  - [Context Providers](#context-providers)
  - [API Layer](#api-layer)
  - [Pages](#pages)
  - [Components](#components)
  - [Templates](#templates)
  - [Styling](#styling)
- [Backend (Server)](#backend-server)
  - [Express App](#express-app)
  - [Database Models](#database-models)
  - [API Routes](#api-routes)
  - [Authentication Middleware](#authentication-middleware)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Data Flow Diagrams](#data-flow-diagrams)
- [Error Handling](#error-handling)
- [Security](#security)

---

## Architecture Overview

The project is a **monorepo** containing both the frontend and backend:

```
┌─────────────────────────────────────────────────────┐
│                   Monorepo Root                     │
│  ┌──────────────┐  ┌───────────────────────────┐   │
│  │   server/     │  │        client/             │   │
│  │  Express API  │  │  React + Vite SPA          │   │
│  │  MongoDB ODM  │  │  Tailwind CSS + Framer     │   │
│  │  JWT Auth     │  │  Motion                    │   │
│  └──────┬───────┘  └─────────────┬───────────── │   │
│         │                        │               │   │
│         └────────┬───────────────┘               │   │
│                  │                                   │
│         dev-server.js (unified)                      │
│         Serves API + Vite on :5173                   │
└─────────────────────────────────────────────────────┘
```

**Key design decisions:**

- **Unified dev server** — `dev-server.js` creates a single Express + Vite instance. API routes mount first (`/api/*`), then Vite handles all remaining requests as a SPA fallback. This avoids CORS issues during development.
- **Modal-based auth** — Login and Register are not separate pages/routes. They are modal overlays that are always mounted at the top level and toggled via AuthContext state (`showLoginModal` / `showRegisterModal`).
- **Template system** — The public portfolio page dynamically selects which React component to render based on the `templateId` field stored in the portfolio document.
- **Vercel deployment** — A serverless function adapter (`api/[[...all]].js`) wraps the Express app for production. The Vite client is built to `client/dist/` and served as static files.

---

## Development Environment

### Unified Dev Server (`dev-server.js`)

Instead of running the backend and frontend separately, the project uses a unified dev server:

```
node dev-server.js
```

**How it works:**

1. Imports the Express app from `server/app.js` (registers API routes + connects to MongoDB)
2. Creates a Vite dev server in **middleware mode** (`server: { middlewareMode: true }`)
3. Mounts Vite's middleware **after** Express routes — so `/api/*` hits Express, everything else passes to Vite
4. Listens on port **5173** (configurable via `PORT` env var)

**Network access:**

```bash
npm run dev -- --host    # Exposes on 0.0.0.0 for LAN access
```

### Available Scripts

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `node dev-server.js` | Start unified dev server (API + frontend) |
| `npm run build` | `cd client && npm run build` | Build production client bundle |
| `npm run dev:server` | `node server/index.js` | Run Express API standalone (port 5000) |
| `npm run postinstall` | `cd client && npm install` | Auto-install client deps after root install |

**Client-only scripts** (from `client/` directory):

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server only (no API) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Frontend (Client)

**Stack:** React 19 · Vite 7 · Tailwind CSS 4 · Framer Motion 12 · React Router 7

### Routing

Defined in `client/src/App.jsx`:

```
ThemeProvider → AuthProvider → BrowserRouter
  ├── <Login />          (modal overlay — always mounted)
  ├── <Register />       (modal overlay — always mounted)
  └── <Routes>
       ├── /                    → LandingPage
       ├── /u/:username         → PublicPortfolio
       ├── /dashboard           → Dashboard       (ProtectedRoute)
       ├── /editor              → Editor           (ProtectedRoute)
       └── *                    → Redirect to /
```

**ProtectedRoute** — Wraps children; if `user` is null (from AuthContext), it redirects to `/` and opens the login modal.

**Login / Register** are NOT routed pages. They render as fixed-position modal overlays controlled by `showLoginModal` and `showRegisterModal` state in `AuthContext`. This is why they are mounted above `<Routes>`.

### Context Providers

#### AuthContext (`context/AuthContext.jsx`)

Provides global authentication state and methods.

| Property | Type | Description |
|---|---|---|
| `user` | `object \| null` | Current user object (includes `_id`, `name`, `email`, `username`, `token`) |
| `loading` | `boolean` | True while an auth request is in-flight |
| `showLoginModal` | `boolean` | Controls Login modal visibility |
| `setShowLoginModal` | `function` | Toggle Login modal |
| `showRegisterModal` | `boolean` | Controls Register modal visibility |
| `setShowRegisterModal` | `function` | Toggle Register modal |
| `login(email, password)` | `async function` | POST `/api/auth/login` — returns `{ success, message? }` |
| `register(name, email, password, username)` | `async function` | POST `/api/auth/register` — returns `{ success, message? }` |
| `logout()` | `function` | Clears user from state and localStorage |

**Persistence:** On mount, `user` is restored from `localStorage.getItem('user')`. On login/register success, the full response (including JWT token) is stored.

#### ThemeContext (`context/ThemeContext.jsx`)

Provides dark/light mode toggle.

| Property | Type | Description |
|---|---|---|
| `theme` | `'dark' \| 'light'` | Current theme (default: `'dark'`) |
| `toggleTheme()` | `function` | Switches between dark and light |

**Mechanism:** Adds/removes `'dark'` class on `<html>` element (Tailwind CSS dark mode class strategy). Persisted in `localStorage` under key `app-theme`.

### API Layer

#### Axios Instance (`api/axiosConfig.js`)

- **Base URL:** Reads from `VITE_API_URL` env var. Falls back to empty string `''` in development (same-origin requests via the unified dev server).
- **Content-Type:** `application/json`
- **Auth Interceptor:** On every request, reads `user` from `localStorage`, extracts `token`, and attaches `Authorization: Bearer <token>` header.

#### Portfolio Service (`api/portfolioService.js`)

| Function | HTTP | Endpoint | Description |
|---|---|---|---|
| `getMyPortfolio()` | GET | `/api/portfolio/me` | Fetch current user's portfolio |
| `upsertPortfolio(data)` | POST | `/api/portfolio` | Create or update portfolio |
| `getPublicPortfolio(username)` | GET | `/api/portfolio/public/:username` | Fetch a user's public portfolio |

### Pages

#### LandingPage (`pages/LandingPage.jsx`)

The marketing homepage for unauthenticated visitors.

| Section | Description |
|---|---|
| **Navbar** | Shared navigation (logo, auth buttons, theme toggle) |
| **Hero** | Animated headline "Build a Stunning Portfolio in Minutes", CTA button |
| **Features Grid** | 3 cards: Real-time Editor, Designer Templates, Mobile Ready |
| **Footer** | Copyright + BYP branding |

- CTA "Start Building Now" → opens Register modal (or redirects to `/dashboard` if logged in)
- Framer Motion entrance animations
- `mesh-gradient` background styling

#### Dashboard (`pages/Dashboard.jsx`)

The authenticated user's home screen.

| Section | Description |
|---|---|
| **Header** | Welcome text, "Edit Portfolio" / "Create Portfolio" button |
| **Portfolio Card** | Shows public URL (`/u/username`), View link (new tab), Copy URL button |
| **Empty State** | Shown when no portfolio exists yet |

- Fetches portfolio via `getMyPortfolio()` on mount
- Copy-to-clipboard with visual feedback (checkmark icon)

#### Editor (`pages/Editor.jsx`)

Full-screen tabbed portfolio editor with 5 tabs:

| Tab | Form Component | Fields |
|---|---|---|
| Personal | `PersonalInfoForm` | Name, role, bio, email, location + skill cards |
| Experience | `ExperienceForm` | Company, position, location, start/end date, description |
| Education | `EducationForm` | Institution, degree, field of study, start/end year, description |
| Projects | `ProjectsForm` | Title, description, tech stack (comma-separated), GitHub link, live link |
| Settings | `SettingsForm` | Template selector, theme toggle, public/private switch, social links |

**Default portfolio state** (when creating from scratch):

```js
{
  personalInfo: { name: '', bio: '', role: '', profilePhoto: '', email: '', phone: '', location: '' },
  education: [],
  skills: [],
  projects: [],
  experience: [],
  certifications: [],
  socialLinks: { github: '', linkedin: '', twitter: '', portfolio: '' },
  settings: { theme: 'light', isPublic: true },
  templateId: 'modern'
}
```

**Save flow:** Calls `upsertPortfolio(portfolioData)` → POST `/api/portfolio` → shows success toast.

#### PublicPortfolio (`pages/PublicPortfolio.jsx`)

Renders a user's portfolio at `/u/:username`.

**Flow:**
1. Extracts `username` from URL params
2. Fetches portfolio via `getPublicPortfolio(username)`
3. Reads `templateId` from the portfolio data
4. Renders the corresponding template component

**Template routing:**

| `templateId` | Component |
|---|---|
| `'modern'` (default) | `ModernTemplate` |
| `'minimal'` | `MinimalTemplate` |
| `'creative'` | `CreativeTemplate` |

**404 State:** Large "404" background text, "Portfolio Not Found" heading, "Create Yours" CTA link to `/`.

#### Login (`pages/Login.jsx`)

Modal overlay (not a route) controlled by `showLoginModal` from AuthContext.

- Fields: Email, Password (with lucide icons)
- Backdrop blur + click-to-close
- Close on Escape key
- Error display (red alert)
- Link to switch to Register modal
- On success: closes modal, navigates to `/dashboard`

#### Register (`pages/Register.jsx`)

Modal overlay controlled by `showRegisterModal`.

- Fields: Full Name, Username, Email, Password, Confirm Password
- Client-side password match validation
- Link to switch to Login modal
- On success: closes modal, navigates to `/dashboard`

### Components

#### Navbar (`components/Navbar.jsx`)

Renders differently based on auth state:

| State | Elements |
|---|---|
| **Logged out** | BYP logo, Features link, theme toggle (Sun/Moon), Login button, "Get Started" CTA |
| **Logged in** | BYP logo, theme toggle, user avatar (initial circle) + name, Logout button |

#### ProtectedRoute (`components/ProtectedRoute.jsx`)

Wrapper component. If `user` is null → redirects to `/` and triggers `setShowLoginModal(true)`.

#### Editor Forms (`components/editor/`)

| Component | Purpose |
|---|---|
| `PersonalInfoForm` | Two-column: personal info fields (left) + skill cards (right) |
| `ExperienceForm` | CRUD list of work experiences with expandable cards |
| `EducationForm` | CRUD list of education entries |
| `ProjectsForm` | CRUD list of projects with tech stack tags |
| `SkillsForm` | Standalone skill management (used within PersonalInfoForm) |
| `SettingsForm` | Two-column: portfolio settings (left) + social links (right) |

**Skill level pills** in PersonalInfoForm:

| Level | Color |
|---|---|
| Beginner | Emerald |
| Intermediate | Sky |
| Advanced | Amber |
| Expert | Rose |

**Template selector** in SettingsForm — 3 visual cards:

| Template | Icon | Gradient | Description |
|---|---|---|---|
| Modern | Layout | Indigo → Blue | Clean & professional |
| Minimal | Minus | Slate | Simple & elegant |
| Creative | Sparkles | Pink → Purple | Bold & expressive |

### Templates

All templates receive the full portfolio data as props and render a complete, standalone portfolio page.

#### ModernTemplate (`templates/ModernTemplate.jsx`)

- **Layout:** Two-column — sticky left sidebar (400px) + scrollable right content
- **Sidebar:** Name (uppercase), role badge, email, location, bio, quick stats (project/skill/experience counts), social links
- **Content:** Experience section → Featured Works (projects) → Skills & Education side-by-side
- **Styling:** Decorative blurred gradient orbs (indigo/purple), `glass-card` effects, `font-outfit`, Framer Motion stagger animations, `rounded-[2rem]` cards

#### MinimalTemplate (`templates/MinimalTemplate.jsx`)

- **Layout:** 12-column bento grid
- **Grid cells:**
  - Profile hero (col-span-8): Name, role, bio
  - Contact card (col-span-4): Email, location, socials
  - Skills (col-span-5): Hover-to-highlight pills
  - Experience timeline (col-span-7): Left-border timeline, scrollable
  - Projects (col-span-12): 3-column grid with numbered overlays (01, 02…)
  - Education (col-span-12): Two-column layout
- **Styling:** Uppercase italic typography, `rounded-[2.5rem]`, subtle blur decorations, hover-to-reveal action buttons

#### CreativeTemplate (`templates/CreativeTemplate.jsx`)

- **Layout:** Single column, full-width, cinematic sections
- **Sections:**
  - Header: First name + period (e.g., "JOHN."), social icons
  - Hero: Massive text `text-[10rem]` — "CREATIVE" gradient + full name, bio in quotes
  - Skills: "TECH SPECTRUM" — large 96px skill cards, hover rotate/scale
  - Experience + Projects: Two-column split with generous whitespace (`gap-40`, `py-40`)
  - Footer CTA: "LET'S WORK TOGETHER." at 10rem, mailto button
- **Styling:** Animated pulsing gradient orbs with `mix-blend-screen`, grid overlay pattern, extreme whitespace, `gradient-text` utility

### Styling

- **Framework:** Tailwind CSS v4 with `@tailwindcss/vite` plugin
- **Dark mode:** Class strategy (`dark:` variants), toggled by ThemeContext
- **Font:** Outfit (applied via `font-outfit` class)
- **Custom utilities** (defined in `index.css`):
  - `mesh-gradient` / `mesh-gradient-dark` / `mesh-gradient-light` — background mesh patterns
  - `glass-card` / `glass-card-dark` — frosted glass card effects
  - `gradient-text` — colorful gradient text
  - `custom-scrollbar` — styled scrollbars
- **Rounded corners:** Consistently large radii (`rounded-[2rem]`, `rounded-[2.5rem]`, `rounded-[3rem]`)
- **Animations:** Framer Motion for page transitions, card entrances, stagger effects, and hover interactions

---

## Backend (Server)

**Stack:** Node.js · Express 5 · Mongoose 9 · JWT · bcryptjs

### Express App (`server/app.js`)

```
Express App
├── Middleware
│   ├── express.json()          # Parse JSON bodies
│   └── cors()                  # Allow all origins, credentials, GET/POST/PUT/DELETE
│
└── Routes
    ├── /api/auth/*             # → routes/auth.js
    └── /api/portfolio/*        # → routes/portfolio.js
```

- `.env` is loaded relative to the `server/` directory
- `connectDB()` is called on import (connects to MongoDB)
- The app is exported as a module (used by `dev-server.js` and the Vercel adapter)

### Database Models

#### User Model (`models/User.js`)

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required |
| `email` | String | Required, Unique |
| `password` | String | Required (hashed) |
| `username` | String | Required, Unique |
| `isPremium` | Boolean | Default: `false` |
| `createdAt` | Date | Auto (timestamps) |
| `updatedAt` | Date | Auto (timestamps) |

**Hooks:**
- `pre('save')` — Hashes password with bcrypt (salt rounds: 10) if the `password` field is modified

**Instance methods:**
- `matchPassword(enteredPassword)` — Compares plain text against the stored hash using `bcrypt.compare()`

#### Portfolio Model (`models/Portfolio.js`)

| Field | Type | Default |
|---|---|---|
| `userId` | ObjectId (ref: User) | Required |
| `templateId` | String | `'modern'` |
| `personalInfo` | Embedded object | — |
| `personalInfo.name` | String | — |
| `personalInfo.bio` | String | — |
| `personalInfo.role` | String | — |
| `personalInfo.profilePhoto` | String | — |
| `personalInfo.email` | String | — |
| `personalInfo.phone` | String | — |
| `personalInfo.location` | String | — |
| `education[]` | Array of objects | `[]` |
| `education[].institution` | String | — |
| `education[].degree` | String | — |
| `education[].fieldOfStudy` | String | — |
| `education[].startYear` | String | — |
| `education[].endYear` | String | — |
| `education[].description` | String | — |
| `skills[]` | Array of objects | `[]` |
| `skills[].name` | String | — |
| `skills[].level` | Enum: `Beginner`, `Intermediate`, `Advanced`, `Expert` | `'Beginner'` |
| `projects[]` | Array of objects | `[]` |
| `projects[].title` | String | — |
| `projects[].description` | String | — |
| `projects[].techStack` | [String] | — |
| `projects[].githubLink` | String | — |
| `projects[].liveLink` | String | — |
| `projects[].image` | String | — |
| `experience[]` | Array of objects | `[]` |
| `experience[].company` | String | — |
| `experience[].position` | String | — |
| `experience[].location` | String | — |
| `experience[].startDate` | String | — |
| `experience[].endDate` | String | — |
| `experience[].description` | String | — |
| `certifications[]` | Array of objects | `[]` |
| `certifications[].name` | String | — |
| `certifications[].issuer` | String | — |
| `certifications[].date` | String | — |
| `certifications[].link` | String | — |
| `socialLinks` | Embedded object | — |
| `socialLinks.github` | String | — |
| `socialLinks.linkedin` | String | — |
| `socialLinks.twitter` | String | — |
| `socialLinks.portfolio` | String | — |
| `settings.theme` | Enum: `light`, `dark` | `'light'` |
| `settings.isPublic` | Boolean | `true` |
| `createdAt` | Date | Auto |
| `updatedAt` | Date | Auto |

### API Routes

#### Auth Routes (`routes/auth.js`)

##### POST `/api/auth/register`

Register a new user.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "username": "johndoe"
}
```

**Validation:**
- Checks if `email` already exists → 400 "User already exists"
- Checks if `username` already exists → 400 "Username already taken"

**Success response (201):**
```json
{
  "_id": "64a...",
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

##### POST `/api/auth/login`

Authenticate an existing user.

**Request body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Success response (200):** Same shape as register response.

**Failure (401):** `{ "message": "Invalid email or password" }`

**JWT:** Signed with `JWT_SECRET`, expires in **30 days**.

---

#### Portfolio Routes (`routes/portfolio.js`)

##### GET `/api/portfolio/me` (Protected)

Returns the authenticated user's portfolio document.

- **Auth:** Requires `Authorization: Bearer <token>` header
- **404:** `{ "message": "Portfolio not found" }` if no portfolio exists
- **200:** Full portfolio document

##### POST `/api/portfolio` (Protected)

Creates or updates the user's portfolio (upsert pattern).

**Request body:** Full or partial portfolio object:
```json
{
  "templateId": "modern",
  "personalInfo": { "name": "John", "role": "Developer", ... },
  "education": [...],
  "skills": [...],
  "projects": [...],
  "experience": [...],
  "certifications": [...],
  "socialLinks": { "github": "https://github.com/johndoe", ... },
  "settings": { "theme": "dark", "isPublic": true }
}
```

**Logic:**
- If portfolio exists for the user → updates only the fields provided (keeps existing values for omitted fields)
- If no portfolio exists → creates a new document

**201** (created) or **200** (updated): Full portfolio document.

##### GET `/api/portfolio/public/:username` (Public)

Fetches a user's portfolio by username for public viewing.

**Logic:**
1. Finds user by `username`
2. Finds portfolio by `userId`
3. Checks `settings.isPublic === true`
4. Returns user info + portfolio

**Success response (200):**
```json
{
  "user": {
    "name": "John Doe",
    "username": "johndoe"
  },
  "portfolio": { ... }
}
```

**404:** `{ "message": "Portfolio is private or not found" }`

### Authentication Middleware

#### `protect` middleware (`middleware/authMiddleware.js`)

Applied to private routes.

**Flow:**
1. Reads `Authorization` header
2. Extracts Bearer token
3. Verifies token with `jwt.verify(token, JWT_SECRET)`
4. Fetches user from DB by decoded `id` (excludes password)
5. Attaches user to `req.user`
6. Calls `next()`

**Errors:**
- No token → 401 "Not authorized, no token"
- Invalid/expired token → 401 "Not authorized, token failed"

---

## Deployment

### Vercel Configuration (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "client/dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/[[...all]]" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**How it works:**
- `npm run build` builds the Vite client into `client/dist/`
- All `/api/*` requests are routed to the catch-all serverless function at `api/[[...all]].js`
- All other requests get the SPA's `index.html` (client-side routing)

### Serverless Adapter (`api/[[...all]].js`)

```js
const app = require('../server/app');
module.exports = app;
```

Wraps the full Express app as a Vercel serverless function. Every API request gets handled by the same Express middleware and routes.

---

## Environment Variables

### Server (`server/.env`)

| Variable | Required | Description |
|---|---|---|
| `MONGO_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret key for signing JWTs |
| `PORT` | ❌ | Server port (default: `5000` standalone, `5173` unified) |
| `CLOUDINARY_CLOUD_NAME` | ❌ | Cloudinary cloud name (for future image upload) |
| `CLOUDINARY_API_KEY` | ❌ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ❌ | Cloudinary API secret |

### Client (`client/.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | ❌ | API base URL. Empty in dev (same-origin). Set for production. |

---

## Data Flow Diagrams

### Registration Flow

```
User fills Register form
  │
  ▼
AuthContext.register(name, email, password, username)
  │
  ▼
POST /api/auth/register
  │
  ├── Check email uniqueness
  ├── Check username uniqueness
  ├── User.create() → bcrypt hashes password on pre-save
  └── Return { user, token }
  │
  ▼
Store user+token in localStorage
  │
  ▼
Redirect to /dashboard
```

### Portfolio Save Flow

```
User edits portfolio in Editor
  │
  ▼
Click "Save" button
  │
  ▼
portfolioService.upsertPortfolio(portfolioData)
  │
  ▼
Axios interceptor attaches Bearer token
  │
  ▼
POST /api/portfolio  (protect middleware verifies JWT)
  │
  ├── Portfolio exists? → Update fields
  └── No portfolio? → Create new document
  │
  ▼
Return saved portfolio document
  │
  ▼
Show success toast in Editor
```

### Public Portfolio View Flow

```
Visitor navigates to /u/johndoe
  │
  ▼
PublicPortfolio extracts :username from URL
  │
  ▼
portfolioService.getPublicPortfolio('johndoe')
  │
  ▼
GET /api/portfolio/public/johndoe
  │
  ├── Find user by username
  ├── Find portfolio by userId
  ├── Check settings.isPublic === true
  └── Return { user, portfolio }
  │
  ▼
Read portfolio.templateId → select template component
  │
  ├── 'modern'   → <ModernTemplate />
  ├── 'minimal'  → <MinimalTemplate />
  └── 'creative' → <CreativeTemplate />
  │
  ▼
Render full portfolio page
```

---

## Error Handling

### Backend

All route handlers use `try/catch` blocks:

```js
try {
  // ... logic
} catch (error) {
  res.status(500).json({ message: error.message });
}
```

**Specific error codes:**
| Status | When |
|---|---|
| 400 | Duplicate email, duplicate username, invalid data |
| 401 | Missing token, invalid token, wrong credentials |
| 404 | Portfolio not found, user not found, private portfolio |
| 500 | Server error, database error |

### Frontend

- Auth context methods return `{ success: boolean, message?: string }` for the UI to handle
- Axios interceptor rejects on error — components catch and display error messages
- 404 pages show custom "Not Found" states with CTAs

---

## Security

| Measure | Implementation |
|---|---|
| **Password hashing** | bcryptjs with 10 salt rounds, hashed on pre-save hook |
| **JWT authentication** | 30-day expiry, stored in localStorage, sent as Bearer token |
| **Protected routes** | Server: `protect` middleware on private endpoints. Client: `ProtectedRoute` component |
| **Input validation** | Mongoose schema validation (enums, required fields) |
| **CORS** | Configured to allow all origins with credentials (configurable) |
| **Privacy** | Portfolio `isPublic` flag checked server-side before returning data |

### Known Considerations

- **localStorage for tokens** — Vulnerable to XSS. Consider httpOnly cookies for production.
- **CORS origin: true** — Open to all origins. Restrict in production.
- **No rate limiting** — Consider adding `express-rate-limit` for auth endpoints.
- **No input sanitization** — Consider adding `express-mongo-sanitize` or `xss-clean`.
