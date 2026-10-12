import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);