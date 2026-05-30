# Website Features Implemented

This document outlines the key features implemented in the portfolio website.

### Core Pages & Content

- **HomePage**: Main landing page with an introduction, summary, and key professional metrics.
- **AboutPage**: A dedicated section for a detailed personal and professional summary.
- **ProjectsPage**: A gallery of projects that can be filtered by categories like "Featured", "Full Stack", and "AI/ML".
- **ProjectDetailPage**: Individual pages for each project, providing details on the problem, solution, and technologies used.
- **SkillsPage**: A comprehensive list of technical skills, grouped by area of expertise.
- **CredentialsPage**: Showcases certifications, hackathon achievements, and other qualifications.
- **ResumePage**: A section to display or provide a link to a professional resume.
- **BlogPage**: A blog section for articles and posts.
- **ContactPage**: Includes a contact form for users to send messages directly.
- **AdminPage**: A private, password-protected dashboard for site administration.

### Interactive & UI Features

- **Responsive Navigation**: The website provides a seamless experience across devices with distinct navigation for desktop and mobile, including a top navigation bar, a mobile header, and a bottom navigation bar for smaller screens.
- **CommandPalette**: A terminal-style command palette allows for quick navigation and access to different parts of the site.
- **ProfileRail**: A persistent sidebar on larger screens displays key profile information at a glance.
- **Rich Text Editor**: The admin dashboard is equipped with a "What You See Is What You Get" (WYSIWYG) editor for creating and editing blog posts with formatted text.

### Backend & Administration

- **Admin Dashboard**: A secure, private area for the site owner to manage content, including viewing contact messages, adding or editing projects, and managing blog posts.
- **Authentication**: The admin dashboard is protected by a password and uses token-based authentication to ensure only authorized access.
- **API Services**: A backend built with Node.js and Express serves data for projects, blogs, and incoming messages.
- **Database Integration**: The application uses MongoDB with Mongoose for persistent data storage and management.
- **Rate Limiting**: To enhance security and prevent abuse, the backend includes middleware to limit the number of API requests from a single IP address.
