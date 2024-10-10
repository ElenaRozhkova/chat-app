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
    origin: process.env.ORIGIN || '*', // Использует значение из переменной окружения или разрешает все origins
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Разрешенные HTTP методы
    credentials: true // Разрешает передачу credentials (например, cookies)
}))*/

/*app.use(cors({
    origin: function (origin, callback) {
        // Разрешаем запросы без origin (например, мобильные приложения или curl)
        if (!origin) return callback(null, true);

        // Разрешаем все origins
        callback(null, origin);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));*/

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use("/uploads/profiles", express.static("uploads/profiles"))

app.use(cookieParser())

app.use(express.json())

app.use("/api/auth", authRoutes)

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

mongoose.connect(databaseURL)
    .then(() => console.log("DB connection successfull"))
    .catch(err => console.log(err.message))