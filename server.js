import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())

// --- CORS Configuration Block ---

// 1. Define your allowed origins
const allowedOrigins = [
  // Add your Vercel USER frontend URL here
  "https://YOUR-FRONTEND-URL.vercel.app", 

  // Add your Vercel ADMIN frontend URL here
  "https://YOUR-ADMIN-URL.vercel.app", 

  // Add your local development URLs
  "http://localhost:3000",
  "http://localhost:5173", // Default for Vite (frontend)
  "http://localhost:5174"  // Default for Vite (admin)
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      // If the origin is in our whitelist, allow it
      callback(null, true);
    } else {
      // Otherwise, block it
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// 2. Use the new CORS options
app.use(cors(corsOptions));

// --- End of CORS Block ---


// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))