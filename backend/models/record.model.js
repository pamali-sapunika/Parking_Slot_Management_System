import mongoose from "mongoose";
import Slot from "./slot.model.js";

const recordSchema = new mongoose.Schema(
    {
        slot_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Slot,
            // type: String,
            required: true
        },
        date_time: {
            type: Date,
            required: true
        },
        vehicle_status: {
            type: String,
            required: true
        },
        admin_id: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
);

const Record = mongoose.model("Record", recordSchema);

export default Record;