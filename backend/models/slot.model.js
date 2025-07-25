import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
	{
		category: {
			type: String,
			required: true, //8.30
		},
        slot_name: {
            type: String,
            required: true, //A
        },
		noofslots: {
			type: Number,
			required: true,
		}
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const Slot = mongoose.model("Slot", slotSchema);

export default Slot;