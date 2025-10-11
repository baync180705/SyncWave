import { Router } from "express";
import { addMusicToTrackHandler, removeMusicFromTrackHandler } from "../controllers/trackControllers";

const trackRouter = Router();

trackRouter.post("/add", addMusicToTrackHandler);
trackRouter.post("/remove", removeMusicFromTrackHandler);

export default trackRouter;