import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRoutes from './routes/productsRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import orderRoutes from './routes/ordersRoute.js'
import checkoutRoutes from './routes/checkoutRoutes.js'
import { connectdb } from "./config/db.js";
const app = express();
dotenv.config();



app.use(cors({
    origin:"http://localhost:5173",
}))

app.use(express.json())

app.use("/api/products",productsRoutes)
app.use("/api/users",usersRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/create-payment-intent",checkoutRoutes);

const PORT = process.env.PORT || 3000;

connectdb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server started on PORT: ${PORT}`);
    })
})