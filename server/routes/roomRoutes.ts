import { Router } from "express";
import { createRoomHandler, getRoomByIDHandler, addUserToRoomHandler, removeUserFromRoomHandler } from "../controllers/roomController.ts";

const roomRouter = Router();

roomRouter.get("/:roomID", getRoomByIDHandler);
roomRouter.post("/create", createRoomHandler);
roomRouter.post("/join", addUserToRoomHandler);
roomRouter.post("/remove", removeUserFromRoomHandler);

export default roomRouter;