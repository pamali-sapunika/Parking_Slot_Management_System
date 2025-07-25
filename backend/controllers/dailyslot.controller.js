import DailySlot from '../models/dailyslot.model.js'
import mongoose from 'mongoose';

export const getDailySlots = async (req, res) => {

    try {
        DailySlot.find().then((dailyslots) => {
            res.json(dailyslots);
        })
    } catch (error) {
        console.log("Error in fetching daily slots", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }

}

export const createDailySlot = async (req, res) => {

    const dailySlot = req.body;

    if(!dailySlot.slot_id || !dailySlot.remaining_slots){
        return res.status(400).json({ success: false, message: "Please provide all fields pamali"});
    }

    // if(!dailySlot.slot_id.isValid){
    //     return res.status(400).json({ success: false, message: "SLot id referance is false"});
    // }

    const newDailySlot = new DailySlot(dailySlot);

    try {
        await newDailySlot.save();
        res.status(201).json({ success: true, message:"New dailySlot created"});
    } catch (error) {
        console.log("Error in creating a new dailySlot", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }

}

export const updateDailySlots = async (req, res) => {

    const { id } = req.params;
    const dailySlot = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Record id/ Record id not found"});
    }

    try {
        await DailySlot.findByIdAndUpdate(id, dailySlot, {new: true});
        console.log("updaing id:", id);
        res.status(200).json({ success: true, message: "Daily slot updated"});
    } catch (error) {
        console.log("Error updating daily slots", error.message);
        req.status(500).json({ success: false, message: "Server error"});
    }

}

export const deleteDailySlots = async (req,res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Record id/ Record id not found"});
    }

    try {
        await DailySlot.findByIdAndDelete(id);
        console.log("deleting id:", id);
        res.status(200).json({ success: true, message: "Daily slot deleted"});
    } catch (error) {
        console.log("Error deleting daily slots", error.message);
        req.status(500).json({ success: false, message: "Server error"});
    }
}