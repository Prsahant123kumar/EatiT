const express = require('express');
const dotenv = require("dotenv");
const mongoDB = require("./connectDb");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const userRoute = require("./routes/User.Auth.routes");
const userPersonalDetails = require("./routes/User.PersonalDetails.routes");

dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ HTTP server created for Socket.IO


mongoDB();

const PORT = process.env.PORT || 3000;

// ✅ Middleware
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// ✅ API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/user-infromation", userPersonalDetails);


// ✅ Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});