require('dotenv').config();
import express, { json, serveStatic } from 'express';
import cors from 'cors';
import { join } from 'path';
import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import sessionRoutes from './routes/sessionRoutes';
import questionRoutes from './routes/questionRoutes';



const app = express();

//Middleware to handle CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],}));


    connectDB()

//Middleware    
app.use(json());


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/question", questionRoutes);

app.use("/api/ai/generate-questions", Protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", Protect, generateExplanation);


//Serve Uploads Folder
app.use('/uploads', serveStatic(join(__dirname, 'uploads'), {}));


//Start Sever
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});