import express, { urlencoded } from "express";
import path from "path";
import cors from "cors"
import { prisma } from "./lib/prisma.js";
import { route } from "./routes/route.js";
import cookieParser from "cookie-parser";
import { corsConfig } from "./config/cors.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig)); 
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

app.use("/api",route);

app.listen(8000,() => {
     console.log('app is running at port 8000');
});

