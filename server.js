import app from "./app.js";
import dotenv from "dotenv";
import connectToDb from "./config/connectDb.js";
dotenv.config();


const port =process.env.PORT || 5002;


app.listen(port,()=>{
    console.log(`Server is listening at ${port}`);
});
connectToDb();
