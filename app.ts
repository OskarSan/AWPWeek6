import express, { Express } from "express";
import path from "path";
import router from "./src/routes"
import morgan from "morgan";
import cors from "cors";
import mongoose, {Connection} from "mongoose";


const app: Express = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));

const mongoDB: string = "mongodb://127.0.0.1:27017/testdb";

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db: Connection = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.use(morgan('dev'));
app.use(express.json());


app.use(express.static(path.join(__dirname, '../public')));
app.use("/", router);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});