import express, { Application } from "express";
import cors from "cors";
import corsConfig from "./config/corsConfig";
import roomRoutes from "./routes/roomRoutes";

const app: Application = express();

app.use(cors(corsConfig));
app.use(express.json());

app.use("/api/rooms", roomRoutes);


export default app;