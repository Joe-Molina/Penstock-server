import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../config';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const token = req.cookies.access_token
  try {
    const data = jwt.verify(token, JWT_SECRET_KEY)
    // req.session.user = data
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT, () => {


  console.log(`Server is running on port ${PORT}`);
});