import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log(err));

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({origin:"*"}));

app.listen(port, () => console.log(`Server is running on port ${port}`));

export default app;