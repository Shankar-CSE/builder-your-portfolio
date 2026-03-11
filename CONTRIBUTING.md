# 🤝 Contributing to Build Your Portfolio

Thank you for your interest in contributing! This guide will help you get set up and make your first contribution.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
  - [Branching Strategy](#branching-strategy)
  - [Commit Messages](#commit-messages)
  - [Code Style](#code-style)
- [Adding a New Template](#adding-a-new-template)
- [Adding a New Editor Tab](#adding-a-new-editor-tab)
- [Adding a New API Endpoint](#adding-a-new-api-endpoint)
- [Testing Your Changes](#testing-your-changes)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)
- [Project Roadmap](#project-roadmap)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. We expect all contributors to:

- Be respectful and constructive in discussions
- Welcome newcomers and help them get started
- Focus on the best outcome for the project
- Accept feedback gracefully

---

## Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **MongoDB** (local install or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier)
- **Git**
- **npm** (comes with Node.js)

### Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/<your-username>/builder-your-portfolio.git
   cd builder-your-portfolio
   ```

3. **Add the upstream remote**
   ```bash
   git remote add upstream https://github.com/<original-owner>/builder-your-portfolio.git
   ```

4. **Install dependencies** (automatically installs client deps too via `postinstall`)
   ```bash
   npm install
   ```

5. **Set up environment variables**

   Create `server/.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_dev_secret_key
   ```

6. **Start the dev server**
   ```bash
   npm run dev
   ```

   This starts both the Express API and Vite frontend on **http://localhost:5173**.

7. **Verify it works** — Open the browser, register an account, create a portfolio, and view it at `/u/yourusername`.

---

## Project Structure

```
builder-your-portfolio/
├── api/                        # Vercel serverless adapter
├── dev-server.js               # Unified dev server (Express + Vite)
├── package.json                # Root scripts + server deps
├── vercel.json                 # Deployment config
│
├── client/                     # Frontend (React + Vite)
│   └── src/
│       ├── api/                # Axios config & service layer
│       ├── components/
│       │   ├── editor/         # Editor tab form components
│       │   └── templates/      # Portfolio render templates
│       ├── context/            # Auth & Theme providers
│       └── pages/              # Route page components
│
└── server/                     # Backend (Express)
    ├── config/                 # Database config
    ├── middleware/              # Auth middleware
    ├── models/                 # Mongoose schemas
    └── routes/                 # API route handlers
```

> 📖 See [DOCUMENTATION.md](DOCUMENTATION.md) for detailed technical documentation of every module.

---

## Making Changes

### Branching Strategy

Always create a new branch from the latest `main`:

```bash
git checkout main
git pull upstream main
git checkout -b <type>/<short-description>
```

**Branch naming conventions:**

| Prefix | Use case | Example |
|---|---|---|
| `feature/` | New features | `feature/pdf-export` |
| `fix/` | Bug fixes | `fix/login-redirect-loop` |
| `template/` | New templates | `template/developer-theme` |
| `docs/` | Documentation changes | `docs/api-examples` |
| `refactor/` | Code refactoring | `refactor/auth-context` |
| `style/` | UI/styling changes | `style/dark-mode-fixes` |

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short description>

[optional body]
```

**Types:**

| Type | Description |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, CSS, no logic changes |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `chore` | Build process, dependencies, configs |

**Examples:**
```
feat(editor): add certifications tab
fix(auth): handle expired token redirect
style(templates): improve mobile spacing in creative template
docs: add API endpoint examples to documentation
```

### Code Style

#### General

- Use **2-space indentation** (tabs in server, see `.editorconfig` if present)
- Use **single quotes** for strings
- Add **trailing commas** in multi-line objects/arrays
- No unused imports or variables

#### Frontend (React)

- **Functional components** only (no class components)
- Use **hooks** for state and side effects
- Use **Tailwind CSS utility classes** for styling — avoid inline styles or CSS modules
- Use **Framer Motion** for animations (no raw CSS animations)
- Use **lucide-react** for icons
- Name components in **PascalCase** (e.g., `PersonalInfoForm.jsx`)
- Name utility files in **camelCase** (e.g., `axiosConfig.js`)

#### Backend (Express)

- Use **CommonJS** (`require` / `module.exports`) — the server does not use ESM
- Use **async/await** with try/catch for all route handlers
- Return consistent error responses: `{ message: string }`
- Use descriptive JSDoc-style route comments:
  ```js
  // @desc    Description of what the route does
  // @route   METHOD /api/path
  // @access  Public | Private
  ```

---

## Adding a New Template

Templates are one of the most impactful contributions! Here's how to add one:

### Step 1 — Create the template component

Create a new file: `client/src/components/templates/YourTemplate.jsx`

```jsx
import React from 'react';
import { motion } from 'framer-motion';

const YourTemplate = ({ portfolio, user }) => {
  const { personalInfo, experience, education, skills, projects, socialLinks, settings } = portfolio;

  return (
    <div className="min-h-screen">
      {/* Your template layout here */}
      {/* Use Tailwind CSS for all styling */}
      {/* Support both light and dark themes via settings.theme */}
      {/* Include a footer with "Built with BYP" branding */}
    </div>
  );
};

export default YourTemplate;
```

**Requirements for templates:**

- ✅ Accept `portfolio` and `user` as props
- ✅ Destructure and render ALL portfolio sections (personalInfo, experience, education, skills, projects, socialLinks)
- ✅ Use Tailwind CSS — no external CSS files
- ✅ Be fully responsive (mobile → desktop)
- ✅ Support both `light` and `dark` theme from `settings.theme`
- ✅ Handle empty arrays gracefully (don't show empty sections)
- ✅ Include social link icons (GitHub, LinkedIn, Twitter)
- ✅ Use `font-outfit` for headings for brand consistency
- ✅ Add a footer with "Built with BYP" or similar branding

### Step 2 — Register the template in PublicPortfolio

Edit `client/src/pages/PublicPortfolio.jsx` and add your template to the template map:

```jsx
import YourTemplate from '../components/templates/YourTemplate';

// In the template selection logic:
const templates = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  yourtemplate: YourTemplate,  // ← Add this
};
```

### Step 3 — Add it to the Settings form

Edit `client/src/components/editor/SettingsForm.jsx` and add a new card to the template selector:

```jsx
{
  id: 'yourtemplate',
  name: 'Your Template',
  description: 'Brief description of the style',
  icon: SomeIcon,  // From lucide-react
  gradient: 'from-color-500 to-color-600'
}
```

### Step 4 — Test thoroughly

- Create a portfolio with all sections filled out
- Switch to your template and verify all data renders correctly
- Test on mobile, tablet, and desktop
- Test both light and dark themes
- Test with empty/missing data

---

## Adding a New Editor Tab

### Step 1 — Create the form component

Create: `client/src/components/editor/YourForm.jsx`

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

const YourForm = ({ data, onChange }) => {
  // data = the relevant array or object from the portfolio state
  // onChange = callback to update the portfolio state

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Form fields here */}
    </motion.div>
  );
};

export default YourForm;
```

### Step 2 — Add the tab in the Editor page

Edit `client/src/pages/Editor.jsx`:

1. Import the form component
2. Add a tab object to the tabs array (with icon from lucide-react)
3. Add the corresponding CRUD handlers
4. Render the form in the tab content area

### Step 3 — Update the Portfolio model (if needed)

If your tab introduces new data fields, add them to `server/models/Portfolio.js` and update the upsert logic in `server/routes/portfolio.js`.

### Step 4 — Update templates

Ensure all 3 existing templates render the new data section.

---

## Adding a New API Endpoint

### Step 1 — Define the route

Add to the appropriate route file in `server/routes/`:

```js
// @desc    What this endpoint does
// @route   METHOD /api/path
// @access  Public | Private
router.get('/path', protect, async (req, res) => {
  try {
    // Your logic here
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

### Step 2 — Add to the API service

If the endpoint is called from the frontend, add a method to `client/src/api/portfolioService.js` (or create a new service file for a different domain):

```js
const yourNewMethod = async (params) => {
  const response = await axios.get(`/api/your-path/${params}`);
  return response.data;
};
```

### Step 3 — Test with curl or the frontend

```bash
# Public endpoint
curl http://localhost:5173/api/your-path

# Protected endpoint
curl http://localhost:5173/api/your-path \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Testing Your Changes

Before submitting a PR, verify:

### Functional Checks

- [ ] The app starts without errors (`npm run dev`)
- [ ] Registration and login work
- [ ] Portfolio creation and editing work (all tabs)
- [ ] Saving persists data to MongoDB
- [ ] Public portfolio page renders correctly
- [ ] Private portfolios return 404 to public visitors
- [ ] Template switching works
- [ ] Theme toggle works (both global and per-portfolio)
- [ ] Copy URL button works on Dashboard

### Visual Checks

- [ ] No layout overflow or broken styling
- [ ] Responsive: test at 375px (mobile), 768px (tablet), 1440px (desktop)
- [ ] Dark mode renders correctly
- [ ] Animations are smooth and not jarring

### Code Quality

- [ ] No ESLint errors: `cd client && npm run lint`
- [ ] No console errors in the browser DevTools
- [ ] No unused imports or variables
- [ ] Build succeeds: `npm run build`

---

## Submitting a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature
   ```

2. **Open a Pull Request** on GitHub against the `main` branch

3. **Fill out the PR template:**

   ```markdown
   ## Description
   Brief description of changes.

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] New template
   - [ ] Documentation
   - [ ] Refactoring

   ## Screenshots (if UI changes)
   | Before | After |
   |--------|-------|
   | screenshot | screenshot |

   ## Checklist
   - [ ] My code follows the project's code style
   - [ ] I have tested my changes locally
   - [ ] I have updated documentation if needed
   - [ ] My changes don't break existing functionality
   - [ ] Build succeeds (`npm run build`)
   ```

4. **Wait for review** — Maintainers may request changes or suggest improvements

5. **Address feedback** — Push additional commits to the same branch

---

## Reporting Bugs

Use [GitHub Issues](../../issues) with the **Bug** label.

**Include:**
- **Description** — Clear explanation of the bug
- **Steps to Reproduce** — Numbered steps to trigger the issue
- **Expected Behavior** — What should happen
- **Actual Behavior** — What actually happens
- **Screenshots** — If it's a visual bug
- **Environment** — Browser, OS, Node.js version

**Template:**
```markdown
## Bug Report

**Description:**
[What went wrong]

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected:** [What should happen]
**Actual:** [What actually happens]

**Browser:** Chrome 120
**OS:** macOS 14 / Windows 11 / Ubuntu 24
**Node.js:** v20.x
```

---

## Requesting Features

Use [GitHub Issues](../../issues) with the **Enhancement** label.

**Include:**
- **Problem** — What problem does this solve?
- **Proposed Solution** — How should it work?
- **Alternatives Considered** — Other approaches you thought of
- **Mockups** — Optional wireframes or design ideas

---

## Project Roadmap

These are features we'd love help with! Pick one and start contributing:

| Priority | Feature | Difficulty |
|---|---|---|
| 🔴 High | Image upload with Cloudinary | Medium |
| 🔴 High | Email verification on register | Medium |
| 🔴 High | Password reset / forgot password | Medium |
| 🟡 Medium | New portfolio templates | Easy–Medium |
| 🟡 Medium | PDF resume export | Medium |
| 🟡 Medium | QR code for portfolio URL | Easy |
| 🟡 Medium | Portfolio analytics (view count) | Medium |
| 🟢 Low | AI content suggestions | Hard |
| 🟢 Low | Custom domain support | Hard |
| 🟢 Low | Certifications & achievements section | Easy |
| 🟢 Low | Animation/transition customization | Medium |

**Good First Issues:**
- Add a new portfolio template
- Add certifications section to the editor
- Add QR code generation on the Dashboard
- Improve form validation with better error messages
- Add loading skeletons to all pages

---

## Questions?

If you're stuck or have questions, feel free to:

- Open a [Discussion](../../discussions) on GitHub
- Comment on the relevant Issue or PR
- Reach out to the maintainers

**Thank you for contributing! Every PR, issue, and suggestion makes this project better. 🙌**
