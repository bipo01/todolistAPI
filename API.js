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

app.get("/all", async (req, res) => {
    const result = await db.query("SELECT * FROM todolist");
    const data = result.rows;

    console.log(data);

    res.json(data);
});

app.get("/add", cors(), (req, res) => {
    db.query("INSERT INTO todolist (atividade) VALUES ($1)", [
        req.query.atividade,
    ]);

    res.json(`${req.query.atividade} adicionada`);
});

app.get("/apagar/:id", (req, res) => {
    db.query("DELETE FROM todolist WHERE id = $1", [req.params.id]);
    res.json(`Atividade com ID: ${req.params.id} removida`);
});

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
