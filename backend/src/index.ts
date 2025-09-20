import express, {Request, Response } from 'express';
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cors from "cors";
import apartmentRoutes from './routes/apartmentRoutes';
import projectRoutes from './routes/projectRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5000;
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://mongo:27017/apartments';

app.use(express.json());
app.use(cors());
app.use(helmet());

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });


app.get('/', (req: Request, res: Response) => {
  res.send("✅ API is running...");
});

app.use('/api/apartments', apartmentRoutes);
app.use('/api/projects', projectRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});