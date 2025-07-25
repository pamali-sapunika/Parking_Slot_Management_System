import express from "express";
import { createDailySlot, deleteDailySlots, getDailySlots, updateDailySlots } from "../controllers/dailyslot.controller.js";

const router = express.Router();

router.get("/", getDailySlots);

router.post("/", createDailySlot);

router.put("/:id", updateDailySlots);

router.delete("/:id", deleteDailySlots);

export default router;