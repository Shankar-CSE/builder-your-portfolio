# 🎓 Build Your Portfolio - No-Code Portfolio Builder for Students

A modern, full-stack MERN application that enables students to create professional portfolio websites without any coding knowledge. Simply fill in your details, choose a template, and get a shareable public portfolio URL.

## ✨ Features

### 🔐 Authentication
- Email/Password registration and login
- JWT-based authentication
- Protected routes for dashboard and editor
- Persistent authentication with localStorage

### 📝 Portfolio Builder
- **Personal Information**: Name, bio, role, email, location
- **Experience**: Add work experience, internships, and jobs
- **Education**: Showcase academic qualifications
- **Skills**: List technical and soft skills with proficiency levels
- **Projects**: Display your best work with tech stacks, GitHub, and live links
- **Social Links**: Connect GitHub, LinkedIn, Twitter, and portfolio sites
- **Settings**: Control theme (light/dark) and privacy (public/private)

### 🎨 Live Editor
- Real-time split-screen editor with live preview
- Tab-based navigation for different sections
- Add/Edit/Delete functionality for all sections
- Auto-save capabilities
- Smooth animations with Framer Motion

### 🌐 Public Portfolio
- Beautiful, responsive portfolio page
- Accessible via `/u/username` URL
- SEO-friendly design
- Mobile-responsive layout
- Professional templates

### 📊 Dashboard
- Portfolio overview and status
- Copy shareable link functionality
- Quick access to editor
- Portfolio completion checklist

## 🛠️ Tech Stack

### Frontend
- **React** (v19) with Vite
- **TailwindCSS** (v4) for styling  
- **Framer Motion** for animations
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Node.js** & **Express.js**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Cloudinary** for image uploads (ready)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd First-Portfolio
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Environment Setup**

Create `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

Create `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000
```

5. **Run the application**

Terminal 1 - Start server:
```bash
cd server
npm run dev
```

Terminal 2 - Start client:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
First-Portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API service layer
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context (Auth)
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   └── package.json
│
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── middleware/       # Auth middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── index.js          # Server entry point
│   └── package.json
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Portfolio
- `GET /api/portfolio/me` - Get current user's portfolio (protected)
- `POST /api/portfolio` - Create/update portfolio (protected)
- `GET /api/portfolio/public/:username` - Get public portfolio

## 🎯 Usage Guide

1. **Register/Login**: Create an account or sign in
2. **Dashboard**: View your portfolio status
3. **Editor**: Click "Edit Portfolio" or "Create Portfolio"
4. **Fill Details**: Navigate through tabs and fill your information:
   - Personal: Name, role, bio
   - Experience: Add work history
   - Education: Add degrees/certifications
   - Skills: List your skills
   - Projects: Showcase your work
   - Social: Add social links
   - Settings: Configure theme & privacy
5. **Save**: Click "Save" button to persist changes
6. **Share**: Copy your portfolio URL from dashboard
7. **View**: Visit `/u/yourusername` to see your live portfolio

## 🐛 Bug Fixes & Improvements

### Completed ✅
- ✅ Implemented all editor tabs (Experience, Education, Skills, Projects, Social, Settings)
- ✅ Added full CRUD operations for all sections
- ✅ Fixed "Coming Soon" placeholders
- ✅ Implemented copy to clipboard for sharing
- ✅ Enhanced live preview with real-time updates
- ✅ Added proper form validation and error handling
- ✅ Improved UX with loading states and animations
- ✅ Added custom scrollbar styling
- ✅ Connected frontend to backend API
- ✅ Setup Vite proxy for API calls

## 🔮 Future Enhancements

- [ ] Image upload integration with Cloudinary
- [ ] Multiple portfolio templates
- [ ] QR code generation
- [ ] PDF resume export
- [ ] Analytics tracking (views, clicks)
- [ ] AI-powered content suggestions
- [ ] Custom domain support
- [ ] Dark/Light theme toggle
- [ ] Certifications section
- [ ] Achievements section
- [ ] Email verification
- [ ] Password reset functionality

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built with ❤️ for students by students

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Made with build your portfolio** ✨