import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';

dotenv.config();

const app = express(); // ✅ must come BEFORE any app.use()

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static('public'));


// Routes
app.use('/api/tasks', tasksRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tp3_tasks';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch((err) => console.error('❌ Erreur MongoDB :', err.message));

app.get('/', (req, res) => {
  res.send('Bienvenue dans TP3 – Express + MongoDB');
});

app.listen(PORT, () =>
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
);
