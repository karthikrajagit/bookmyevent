import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();




let catched = (global as any).mongoose || {Connection: null, promise: null}

export const connectToDatabase = async () => {
    if (catched.Connection) return catched.Connection;
    
    if (!process.env.MONGODB_URL) {
        throw new Error("MONGODB_URL is not defined");
    }
    
    catched.promise = catched.promise || mongoose.connect(process.env.MONGODB_URL, {
        dbName: "bookmyevent",
        bufferCommands: false,
    });

    catched.Connection = await catched.promise;
    return catched.Connection;
}