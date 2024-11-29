
import express from 'express';
import cors from 'cors';
// import jwt from 'jsonwebtoken'
// import { JWT_SECRET_KEY } from '../config';
import auth from './api/auth/auth.routes';
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use('/auth', auth);

app.listen(PORT, () => {


  console.log(`Server is running on port ${PORT}`);
});