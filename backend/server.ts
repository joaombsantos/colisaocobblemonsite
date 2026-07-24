import express from 'express';
import configDotenv from './src/config/dotenv';
import cors from 'cors';
import routes from './src/routes/routes';
import path from 'path';
import rateLimit from "express-rate-limit";

configDotenv();

const app = express();
const port = process.env.PORT;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: { error: "Too much requisitions from IP. Try again later." }
});

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(routes);

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use('/api/', limiter);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
});
    