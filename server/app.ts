import express, { Application } from "express";
import cors from "cors";
import corsConfig from "./config/corsConfig";
import roomRoutes from "./routes/roomRoutes";
import trackRoutes from "./routes/trackRoutes";

const app: Application = express();

app.use(cors(corsConfig));
app.use(express.json());

app.use("/api/rooms", roomRoutes);
app.use("/api/tracks", trackRoutes);


export default app;