import express from 'express'; //importing express framework; helps create web servers and APIs easily
import dotenv from 'dotenv'; //importing dotenv to load environment variables 
import { connectDB } from './config/db.js'; //importing connectDB function to handle database connection
import productRoutes from './routes/product.route.js';
import cors from 'cors';
import path from "path"

dotenv.config(); //loading environment variables from .env file

const app = express(); //intializes express app used to define routes and middleware
const PORT = process.env.PORT || 5000

app.use(cors());

/**app.get('/', (req,res)=>{
    res.send("Server is ready");
});*/

app.use(express.json());//allows to accept JSON data in req.body

//console.log(process.env.MONGO_URI); //printing the url

const __dirname = path.resolve();

app.use("/api/products", productRoutes);

app.listen(PORT, () => { //starts express server and listens for incoming requests on port
    connectDB(); ///calls function to establish connection to database when server starts
    console.log("Server started at http://localhost:" + PORT); //logs a message to the console confirming server is running
});

console.log('Environment:', process.env.NODE_ENV);
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}