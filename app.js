import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res, __) => {
    res.status(404).json({message: "Route not found"});
});

app.use((err, _, res, __) => {
    const {status = 500, message = "Server error"} = err;
    res.status(status).json({message});
});

const {DB_HOST, PORT = 3000} = process.env;
mongoose.connect(DB_HOST)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    })
    .catch(err => {
        console.log(`Server not running. Error message: ${err.message}`);
        process.exit(1);
    });