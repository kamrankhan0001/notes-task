import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import clc from 'cli-color';


import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
//const bodyParser = require('body-parser');
//const cors = require('cors');
///app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Middlewares
//app.use(cors());
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
//app.use('/api/protected', authMiddleware); // only apply to secured routes





// Connect DB and Start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(clc.green("MongoDB connected successfully!"));
    app.listen(PORT, () => console.log(clc.yellow(`Server running on port ${PORT}`)));
  })
  .catch((err) => {
    console.error(clc.red("Error connecting to MongoDB: "), err);
    process.exit(1); // Exit process with failure
  });