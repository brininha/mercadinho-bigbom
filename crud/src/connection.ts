import mongoose from "mongoose";

const URI = 'mongodb://localhost:27017/banquinho';

async function connectDB() {
    const DB = await mongoose.connect(URI)
    console.log(`${mongoose.connection.db.databaseName} connected!`)
}

export { connectDB };