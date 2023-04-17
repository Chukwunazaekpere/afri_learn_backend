import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path: "./src/config/.env"});



const NODE_ENV = process.env.NODE_ENV;
const DB_URI = NODE_ENV === "local" ? process.env.LOCAL_DB_URI as string : process.env.STAGE_DB_URI as string; 
const databaseConfig = async() => {
    try {
        console.info("Afri learn is initiating a database connection.....");
        await mongoose.connect(DB_URI, {
            // useCreateIndex: true,
            // useNewUrlParser: true,
            // useUnifiedTopology: true,

        });
        await mongoose.connection.collection("topics").drop()
        console.info("Database connection was successful....");
    } catch (error) {
        console.error("Error in database connection........");
    };
};

export default databaseConfig;