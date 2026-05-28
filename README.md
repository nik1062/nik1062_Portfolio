# Nikunj Kumar | Full-Stack & AI Developer Portfolio

A professionally structured, modern MERN-stack portfolio featuring an AI-powered assistant, a secure admin dashboard, and an MDX-based technical blog.

![Portfolio Preview](preview.png)

## 🌟 Key Features

### 🤖 Gemini AI Assistant
- **Dynamic Interaction:** Powered by Google Gemini 2.5 Flash, trained on portfolio-specific context.
- **Context-Aware:** Answers questions about Nikunj's projects, skills, and background with high accuracy.
- **Graceful Fallback:** Integrated keyword-matching system for offline/no-key scenarios.

### 🔒 Secure Admin Dashboard (`/admin`)
- **JWT Authentication:** Secure login system using JSON Web Tokens.
- **Message Inbox:** A private interface to view and manage contact form submissions.
- **Protected API:** Rate-limited and authenticated endpoints for sensitive data.

### 📝 MDX Technical Blog
- **Markdown + React:** Write technical articles in Markdown (`.mdx`) while using React components inside.
- **Dynamic Loading:** Automatically fetches and renders posts from the content directory.
- **Developer Focused:** Built-in styling for code blocks and technical documentation.

### 🚀 Performance & UI
- **Modular Architecture:** Fully deconstructed frontend (pages/components) and backend (MVC).
- **Premium Animations:** High-end micro-interactions and transitions using Framer Motion.
- **Responsive Design:** Optimized for mobile, tablet, and ultra-wide screens.
- **Vite-Powered:** Lightning-fast development and optimized production builds.

## 🛠️ Tech Stack

**Frontend:**
- React 19 (Hooks, Context API)
- Vite
- Framer Motion (Animations)
- React Router 7 (Dynamic Routing)
- Lucide React (Icons)
- MDX (Technical Content)

**Backend:**
- Node.js & Express 5
- MongoDB & Mongoose (ODM)
- Google Generative AI (Gemini SDK)
- JWT (Authentication)
- Helmet & Express Rate Limit (Security)

## 🏁 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Atlas or Local)
- Google Gemini API Key

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/nik1062/nikunj-portfolio-mern.git

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5050
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_secret_random_string
ADMIN_PASSWORD=your_dashboard_password
```

### 4. Run the Project
```bash
# Run both Frontend & Backend concurrently
npm run dev:full
```

## 📂 Project Structure

```text
├── server/
│   ├── controllers/    # Route logic (Auth, AI, Contact)
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth & Security layers
│   └── index.js        # Server entry point
├── src/
│   ├── components/     # Modular UI & Sections
│   ├── pages/          # Route components (Home, Admin, etc.)
│   ├── services/       # Centralized API layer
│   ├── content/        # MDX Blog posts
│   ├── constants/      # Shared data & config
│   └── App.jsx         # Main router entry
└── vite.config.js      # MDX & React configuration
```

## 🤝 Contact
- **Email:** [nikunjkumar1062@gmail.com](mailto:nikunjkumar1062@gmail.com)
- **LinkedIn:** [Nikunj Kumar](https://www.linkedin.com/in/nikunj-kumar-ba2728332)
- **GitHub:** [@nik1062](https://github.com/nik1062)

---
*Built with ❤️ by Nikunj Kumar*
