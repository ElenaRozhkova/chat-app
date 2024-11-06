import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"
import contactsRoutes from "./routes/ContactRoutes.js"
import setupSocket from "./socket.js"

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
    origin: true, // Это разрешит запросы с любого домена
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.options('*', cors());



app.use("/uploads/profiles", express.static("uploads/profiles"))

app.use(cookieParser())

app.use(express.json())


app.use("/api/auth", authRoutes)
app.use("/api/contacts", contactsRoutes)

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

setupSocket(server)

mongoose.connect(databaseURL)
    .then(() => console.log("DB connection successfull"))
    .catch(err => console.log(err.message))



/*const connectDB = async () => {
    try {
        await mongoose.connect(databaseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB подключена');
    } catch (error) {
        console.error('Ошибка подключения MongoDB:', error);
        process.exit(1);
    }
};

connectDB();*/