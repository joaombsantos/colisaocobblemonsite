import express from 'express';
import configDotenv from './src/config/dotenv';
import cors from 'cors';
import routes from './src/routes/routes';
import path from 'path';
import rateLimit from "express-rate-limit";
import { execSync } from 'child_process';

configDotenv();

try {
    console.log("Executando migrações do Prisma...");
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log("Gerando Prisma Client...");
    execSync('npx prisma generate', { stdio: 'inherit' });
} catch (e) {
    console.error("Erro no setup do Prisma:", e);
}

const app = express();
const port = process.env.SERVER_PORT || process.env.PORT || 3300;

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
    origin: [
        'https://colisaocobblemon.com.br',
        'https://www.colisaocobblemon.com.br',
        'https://colisaocobblemonsite.vercel.app',
        process.env.FRONTEND_URL || "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use('/api/', limiter);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(Number(port), '0.0.0.0', () => {
    console.log(`${process.env.APP_NAME || 'Backend'} app listening on port ${port} (0.0.0.0)`);
});