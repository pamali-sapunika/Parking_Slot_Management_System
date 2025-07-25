import mongoose from "mongoose";
import Record from "../models/record.model.js";
import DailySlot from "../models/dailyslot.model.js";

export const getRecord = async (req, res) => {

    try {
        const records =  await Record.find({});
        res.status(200).json({success: true, data: records});
    } catch (error) {
        console.log("Error in fetching records", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }

}

export const createRecord = async (req, res) => {

    const record = req.body;

    if(!record.date_time || !record.vehicle_status || !record.slot_id){
        return res.status(400).json({ success: false, message: "Please provide all fields"});
    }

    const newRecord = new Record(record);

    try {
        await newRecord.save();
        res.status(201).json({ success: true, message:"New record created"});
    } catch (error) {
        console.log("Error in creating a new record", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }

}

export const createRecordWithDailySlots = async (req, res) => {

    const { slotid } = req.params; 
    const record = req.body;

    record.slot_id = slotid;

    if(!record.date_time || !record.vehicle_status){
        return res.status(400).json({ success: false, message: "Please provide all fields"});
    }

    if(!mongoose.Types.ObjectId.isValid(slotid)){
        return res.status(404).json({ success: false, message: "Invalid slot id to referance"});
    }

    const newRecord = new Record(record);
    // console.log("Moving forward in updating both tables");

    try {
        await newRecord.save();

        const dailySlot = await DailySlot.findOne({ slot_id: slotid });

        if (!dailySlot) {
            return res.status(404).json({ success: false, message: "Daily slot not found" });
        }

        if(record.vehicle_status === "Arrival"){
            dailySlot.remaining_slots += 1;
        }
        if(record.vehicle_status === "Departure"){
            dailySlot.remaining_slots -= 1;
        }

        await dailySlot.save(); 
        res.status(201).json({ success: true, message:"New record created with updating daily slots"});
    } catch (error) {
        console.log("Error in creating a new record", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }

}

export const updateRecord =  async (req, res) => {

    const { id } = req.params;

    const record = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid record id"});
    }

    try {
        await Record.findByIdAndUpdate(id, record, {new: true}); //new returns all document before updating
        res.status(200).json({ success: true, message: "Record updated succesfully"});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const deleteRecord = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Record id/ Record id not found"});
    }

    try {
        await Record.findByIdAndDelete(id);
        console.log("deleting id:", id);
        res.status(200).json({ success: true, message: "Record Successfully deleted"})
    } catch (error) {
        console.error("Record not deleted succesfully", error.message);
        res.status(404).json({ success: true, message: "Server error"});
    }
}