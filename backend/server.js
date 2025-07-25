import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import slotRoutes from "./routes/slot.route.js"
import recordRoutes from "./routes/record.route.js"
import dailySlotRoutes from "./routes/dailyslot.route.js"
import cors from "cors"

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); //allows JSON data in req.body

app.use(cors());

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true
}));

app.use("/api/slots", slotRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dailyslots", dailySlotRoutes);

app.listen(port, () => {
    connectDB();
    console.log("Server started at http://localhost:" + port);
})

//For our slot table, we need only get and put APIs