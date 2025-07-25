import express from 'express';
import { getRecord, createRecord, updateRecord, deleteRecord, createRecordWithDailySlots } from '../controllers/record.controller.js';

const router = express.Router();

router.get("/", getRecord);

router.post("/", createRecord);

// router.post("/:slotid", createRecordWithDailySlots);
router.post("/:slotid", createRecordWithDailySlots);

router.put("/:id", updateRecord);

router.delete("/:id", deleteRecord);

export default router;