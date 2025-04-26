import { mongoose } from 'mongoose';

const uri = "mongodb+srv://onboardly:I8aZ7xVOpBrza3cQ@cluster0.vd8vtog.mongodb.net/onboardly?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = {
};

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(uri, clientOptions);

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