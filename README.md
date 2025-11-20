# Modern MERN Auth + Dashboard App

A production-ready MERN stack application featuring modern design, smooth animations, JWT authentication, and full CRUD functionality for task management.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

## 🎯 Overview

This is a full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack. It features a beautiful, modern UI with smooth animations, secure JWT authentication, and a complete task management system.

## ✨ Features

### Frontend
- **Modern React UI** with Vite for fast development
- **TailwindCSS** for beautiful, responsive design
- **Framer Motion** for smooth component animations
- **GSAP** for hero section animations
- **ScrollReveal** for scroll-triggered animations
- **React Hook Form + Zod** for form validation
- **Protected Routes** with authentication
- **Real-time Search & Filter** for tasks
- **Responsive Design** for all screen sizes

### Backend
- **JWT Authentication** with secure token management
- **Password Hashing** using bcrypt
- **RESTful API** with Express.js
- **MongoDB** for data storage
- **Middleware** for route protection
- **Error Handling** and validation
- **CORS** enabled for cross-origin requests

### Task Management
- Create, Read, Update, Delete tasks
- Filter by status (pending, in-progress, completed)
- Filter by priority (low, medium, high)
- Search tasks by title or description
- Set due dates for tasks
- Beautiful task cards with animations

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Advanced animation library
- **ScrollReveal** - Scroll animations
- **React Router DOM** - Routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications
- **date-fns** - Date formatting

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
root/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskModal.jsx
│   │   │   └── ProfileCard.jsx
│   │   ├── contexts/       # React contexts
│   │   │   └── AuthContext.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── taskController.js
│   │   │   └── userController.js
│   │   ├── models/        # MongoDB models
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/        # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── middleware/    # Custom middleware
│   │   │   └── authMiddleware.js
│   │   ├── utils/         # Utility functions
│   │   │   └── generateToken.js
│   │   └── index.js       # Server entry point
│   ├── package.json
│   └── .env.example
│
├── README.md
└── postman_collection.json
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern_auth_dashboard
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:3000`

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": ""
    },
    "token": "jwt_token_here"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": ""
    },
    "token": "jwt_token_here"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer {token}
Query Parameters:
  - status: pending | in-progress | completed | all
  - priority: low | medium | high | all
  - search: string
```

#### Get Single Task
```http
GET /api/tasks/:id
Authorization: Bearer {token}
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the MERN app",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated title",
  "status": "in-progress",
  "priority": "medium"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer {token}
```

### User Endpoints

#### Get Profile
```http
GET /api/user/profile
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /api/user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "avatar": "avatar_url"
}
```

## 🎨 UI/UX Features

### Animations
- **GSAP Hero Animation**: Smooth reveal animation on landing page
- **ScrollReveal**: Elements appear as you scroll
- **Framer Motion**: Smooth transitions and micro-interactions
- **Hover Effects**: Interactive card hover animations
- **Loading States**: Smooth loading indicators

### Design
- **Pastel Color Scheme**: Soft, modern color palette
- **Glass Morphism**: Frosted glass effect on cards
- **Responsive Layout**: Works on all device sizes
- **Clean Typography**: Inter font family
- **Smooth Scrolling**: Enhanced scroll experience

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt (12 rounds)
- Protected API routes with middleware
- Input validation on both client and server
- CORS configuration
- Environment variables for sensitive data

## 📸 Screenshots

### Landing Page
- Hero section with GSAP animations
- Feature cards with scroll reveal
- Call-to-action sections

### Dashboard
- User profile card
- Task statistics
- Task grid with search and filters
- Create/Edit task modal

### Authentication
- Login page with form validation
- Register page with password confirmation
- Error handling and user feedback

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables:
   - `PORT`
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV`

2. Update CORS settings for production domain

3. Deploy using your platform's CLI or dashboard

### Frontend Deployment (Vercel/Netlify)

1. Build the production bundle:
```bash
cd client
npm run build
```

2. Deploy the `dist` folder to your hosting platform

3. Set environment variable:
   - `VITE_API_URL` to your backend URL

## 🧪 Testing

### Manual Testing
1. Register a new user
2. Login with credentials
3. Create, edit, and delete tasks
4. Test search and filter functionality
5. Test responsive design on different screen sizes

### API Testing
Use the provided Postman collection to test all API endpoints.

## 📈 Scalability Approach

### Current Architecture
- Monolithic backend with Express
- MongoDB for data storage
- JWT for stateless authentication

### Future Improvements
- Implement Redis for session management
- Add pagination for large task lists
- Implement real-time updates with WebSockets
- Add file upload functionality
- Implement task categories and tags
- Add team collaboration features
- Implement task templates
- Add email notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using modern web technologies

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify MongoDB connection string format

**CORS Errors**
- Check backend CORS configuration
- Verify frontend API URL matches backend URL

**Authentication Issues**
- Clear localStorage and try logging in again
- Check JWT_SECRET is set correctly
- Verify token is being sent in request headers

**Port Already in Use**
- Change PORT in .env file
- Kill process using the port

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [GSAP Documentation](https://greensock.com/docs/)

---

**Note**: Remember to change the JWT_SECRET in production and never commit sensitive data to version control.

