import { mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DB_URI;

const clientOptions = {
};

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(uri, clientOptions);
        console.log('✅ MongoDB Connected Successfully');

        // Check connection status
        mongoose.connection.once('open', () => {
            console.log("Successfully connected to MongoDB!");
        });

        // Optionally, perform a simple ping command
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Now you can add your logic for routes, controllers, etc.

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDB;