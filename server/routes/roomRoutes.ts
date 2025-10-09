import { Router } from "express";
import { createRoomHandler, getRoomByIDHandler, addUserToRoomHandler, removeUserFromRoomHandler } from "../controllers/roomController.ts";

const router = Router();

router.get("/:roomID", getRoomByIDHandler);
router.post("/create", createRoomHandler);
router.post("/join", addUserToRoomHandler);
router.post("/remove", removeUserFromRoomHandler);

export default router;