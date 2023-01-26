import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECTION_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to monggoDB"));

db.once('open', ()=>{
    console.log("Connected Succefully");
});

export default db;