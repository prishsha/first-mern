import mongoose from "mongoose"//import the mongoose library to interact with MongoDB

export const connectDB = async () => {
    try
    {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        //Connect to MongoDB using URI stored in environment variables
        console.log(`MongoDB Connected: ${conn.connection.host} `);
        //logs the MongoDB host to console on successful connection
    }catch(error)
    {
        console.log(`Error: ${error.message}`); //if error occurs during connection, log the error message
        process.exit(1); //process code 1 means exit with failure, 0 means success
    }
}