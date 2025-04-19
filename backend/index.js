const express = require('express');
const dotenv = require('dotenv');
const mongoDB = require('./connectDb');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const userRoute = require('./routes/User.Auth.routes.js');
const userPersonalDetails = require('./routes/User.PersonalDetails.routes.js');
const postRoute = require('./routes/Post.routes.js');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Database connection
mongoDB();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// API Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/profile', userPersonalDetails); // Fixed typo: "infromation" → "information"
app.use('/api/v1/posts', postRoute);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});