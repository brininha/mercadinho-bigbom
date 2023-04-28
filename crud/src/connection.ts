import mongoose from "mongoose";

const URI = 'mongodb://localhost:27017';

async function connectDB() {
    const DB = await mongoose.connect(URI, { dbName: 'banquinho' })
    console.log(`${mongoose.connection.db.databaseName} connected!`)
}

export { connectDB };