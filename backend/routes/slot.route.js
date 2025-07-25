import express from "express";
import { createSlot, deleteSLot, getSlots, updateSlot, addOneSlotUpdate, removeOneSlotUpdate } from "../controllers/slot.controller.js";

const router = express.Router();

router.get("/", getSlots)

router.post("/", createSlot);

router.put("/:id", updateSlot)

router.patch("/slotadd/:slotid", addOneSlotUpdate)

router.patch("/slotremove/:slotid", removeOneSlotUpdate)

router.delete("/:id", deleteSLot)

export default router;