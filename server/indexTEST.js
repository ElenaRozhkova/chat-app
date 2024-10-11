import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"

dotenv.config();



const app = express();
const port = process.env.PORT || 1000;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))
/*
app.use(cors({
    origin: true, // Использует origin запроса, если он есть
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));*/

/*app.use(cors({
    origin: '*',
    credentials: true
}));*/

app.use("/uploads/profiles", express.static("uploads/profiles"))

app.use(cookieParser())

app.use(express.json())



const test = async (request, response, next) => {
    try {

        return response.status(200).send("mytest");
    }
    catch (error) {
        console.log({ error })
        return response.status(500).send("Internal Server Error");
    }
}
app.use("/test", test)

app.use("/api/auth", authRoutes)

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

mongoose.connect(databaseURL)
    .then(() => console.log("DB connection successfull"))
    .catch(err => console.log(err.message))