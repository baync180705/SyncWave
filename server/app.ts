import express, { Application } from "express";
import cors from "cors";
import corsConfig from "./config/corsConfig";

const app: Application = express();

app.use(cors(corsConfig));
app.use(express.json());


export default app;