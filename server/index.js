import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors'; //Connect frontend to backend
import authRouter from './Routes/auth.route.js';
import itemsRouter from './Routes/items.route.js';
import paymentRouter from './Routes/payment.route.js'
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 1005;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'https://golden-hotteok-426593.netlify.app',
    credentials: true
}));

app.get("/",(req,res)=>{
    res.json({Message:"Backend Hosted !"});
})
app.use("/api/auth", authRouter);
app.use("/api/items", itemsRouter);
app.use("/api/payment", paymentRouter);
app.get("/api/getKey",(req,res)=>{
    res.status(200).json(process.env.RAZORPAY_ID_KEY)
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
});

mongoose.connect(process.env.MONGO).then(() =>
    console.log("Connection To MongoDB successful")
).catch((error) => {
    console.log(error);
})
