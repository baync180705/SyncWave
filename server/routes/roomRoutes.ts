import { Router } from "express";
import { createRoomHandler, getRoomByIDHandler, addUserToRoomHandler } from "../controllers/roomController.ts";

const router = Router();

router.get("/:roomID", getRoomByIDHandler);
router.post("/create", createRoomHandler);
router.post("/join", addUserToRoomHandler);

export default router;