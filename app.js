import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import db from './config/mongoose.js';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(json());




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})