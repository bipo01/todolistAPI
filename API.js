import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import env from "dotenv";

const app = express();
const port = 4000;
env.config();

const db = new pg.Client({
    connectionString: process.env.PG_URL,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM todolist");
    const data = result.rows;

    res.json(data);
});

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
