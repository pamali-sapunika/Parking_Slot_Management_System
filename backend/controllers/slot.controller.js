import Slot from "../models/slot.model.js";
import mongoose from "mongoose";

export const getSlots = async (req,res) => {
    try {
        Slot.find().then((slots) => {
            res.json(slots);
        })
    } catch (error) {
        console.log("Error in fetching slots", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const createSlot = async (req, res) => {
    const slot = req.body;

    if(!slot.category || !slot.noofslots){
        return res.status(400).json({ success:false, message: "Please provie all fieldss"});
    }

    const newSlot = new Slot(slot);

    try {
        await newSlot.save();
        res.status(201).json({ success: true, data: newSlot });
    } catch (error) {
        console.error("Error in creating product:", error.message);
        res.status(500).json({ success: false, message: "server errors"});
    }
}

export const addOneSlotUpdate = async (req, res) => {

    const { slotid } = req.params;

    const slot = req.body;

    if(!mongoose.Types.ObjectId.isValid(slotid)){
        return res.status(404).json({ success: false, message: "Invalid slot id/ SLot id not found"});
    }

    try {
        const existingSlot = await Slot.findById(slotid);

        if (!existingSlot) {
            return res.status(404).json({ success: false, message: "Slot not found" });
        }

        existingSlot.noofslots += 1;
        await existingSlot.save();
        console.log("Saved by adding one");
        res.status(200).json({ success: true, message: "Slot updated succesfully by adding one"});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error"});
    }

}

export const removeOneSlotUpdate = async (req, res) => {

 const { slotid } = req.params;

    const slot = req.body;

    if(!mongoose.Types.ObjectId.isValid(slotid)){
        return res.status(404).json({ success: false, message: "Invalid slot id/ SLot id not found"});
    }

    try {
        const existingSlot = await Slot.findById(slotid);

        if (!existingSlot) {
            return res.status(404).json({ success: false, message: "Slot not found" });
        }
        
        existingSlot.noofslots -= 1;
        await existingSlot.save();
        console.log("Saved by adding one");
        res.status(200).json({ success: true, message: "Slot updated succesfully by removing one"});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const updateSlot =  async (req, res) => {
    const { id } = req.params;

    const slot = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid slot id/ SLot id not found"});
    }

    try {
        await Slot.findByIdAndUpdate(id, slot, {new: true}); //new returns all document before updating
        res.status(200).json({ success: true, message: "Slot updated succesfully sapunika"});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const deleteSLot = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid slot id/ SLot id not found"});
    }

    try {
        await Slot.findByIdAndDelete(id);
        console.log("deleting id:", id);
        res.status(200).json({ success: true, message: "Slot Successfully deleted"})
    } catch (error) {
        console.error("Slot not deleted succesfully", error.message);
        res.status(404).json({ success: true, message: "Server error"});
    }
}