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

/*app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))*/

app.use(cors({
    origin: function (origin, callback) {
        console.log("Request from origin:", origin);
        callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

/*app.use(cors({
    origin: process.env.ORIGIN ? process.env.ORIGIN.split(',').map(o => o.trim()) : '*',
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));*/


app.use("/uploads/profiles", express.static("uploads/profiles"))

app.use(cookieParser())

app.use(express.json())


app.use("/api/auth", authRoutes)
app.use("/api/auth", authRoutes)

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

/*mongoose.connect(databaseURL)
    .then(() => console.log("DB connection successfull"))
    .catch(err => console.log(err.message))*/

/*
mongoose.connect(databaseURL, {
    serverSelectionTimeoutMS: 30000, // Увеличьте до 30 секунд
    connectTimeoutMS: 30000
})
    .then(() => console.log("DB connection successfull"))
    .catch(err => console.log(err.message))

*/
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB подключена');
    } catch (error) {
        console.error('Ошибка подключения MongoDB:', error);
        process.exit(1);
    }
};

connectDB();