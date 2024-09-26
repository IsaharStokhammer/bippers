import express from 'express';
import dotenv from "dotenv";
import crudRouter from "./routes/crud.js"
import cors from 'cors';
dotenv.config();


const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.json()); // Body parser
app.use(cors());

app.use('/home', (req, res) => {
    res.send("Hello World😎");
});

app.use('/api/beepers', crudRouter);

app.listen(PORT, () => {
    console.log("server is on👌");
}); // Listning for requests