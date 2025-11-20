# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### Step 2: Setup Environment Variables

#### Backend (.env file in server/)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern_auth_dashboard
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

#### Frontend (.env file in client/ - Optional)
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Start MongoDB

Make sure MongoDB is running on your system:
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in MONGODB_URI
```

### Step 4: Start the Application

#### Terminal 1 - Backend
```bash
cd server
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd client
npm run dev
```

### Step 5: Open the App

Open your browser and navigate to:
```
http://localhost:3000
```

## ✅ Test the Application

1. **Register a new account** at `/register`
2. **Login** with your credentials at `/login`
3. **Create tasks** in the dashboard
4. **Search and filter** tasks
5. **Edit and delete** tasks

## 🧪 Test API with Postman

1. Import `postman_collection.json` into Postman
2. Start with "Register User" or "Login User"
3. The token will be automatically saved
4. Test all other endpoints

## 🐛 Troubleshooting

**Port 5000 already in use?**
- Change PORT in server/.env

**Port 3000 already in use?**
- Vite will automatically use the next available port

**MongoDB connection error?**
- Check if MongoDB is running
- Verify MONGODB_URI is correct
- For MongoDB Atlas, ensure IP is whitelisted

**CORS errors?**
- Verify backend is running on port 5000
- Check VITE_API_URL matches backend URL

## 📚 Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Explore the codebase structure
- Customize the UI and add features
- Deploy to production

Happy coding! 🎉

