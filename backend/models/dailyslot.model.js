import mongoose from "mongoose";
import Slot from "./slot.model.js";

const dailySlotSchema = new mongoose.Schema(
    {
        slot_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: Slot,
            required: true
        },
        remaining_slots: {
            type: Number,
            required: true
        }
    }
)

const DailySlot = mongoose.model("DailySlot", dailySlotSchema);

export default DailySlot;