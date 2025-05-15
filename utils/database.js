import mongoose from "mongoose";

export default async function connectDB() {
    const DATABASE_URL = process.env.DATABASE_URL ?? "";

    try {
        await mongoose.connect(DATABASE_URL);
        console.log(`Database connected: ${DATABASE_URL}`);
    } catch (error) {
        console.error(`Connection error: ${error}`);
        process.exit(1);
    }

    const dbConn = mongoose.connection;
    dbConn.on('error', (err) => {
        console.error(`Runtime DB error: ${err}`);
    });
}
