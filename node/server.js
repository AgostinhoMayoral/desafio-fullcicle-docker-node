const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL");
  db.query("CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))");
});

app.get("/", (req, res) => {
  const name = `Usuário ${Math.floor(Math.random() * 1000)}`;
  db.query("INSERT INTO people (name) VALUES (?)", [name], (err) => {
    if (err) {
      console.error("Erro ao inserir nome:", err);
      res.status(500).send("Erro ao inserir nome");
      return;
    }

    db.query("SELECT name FROM people", (err, results) => {
      if (err) {
        console.error("Erro ao buscar nomes:", err);
        res.status(500).send("Erro ao buscar nomes");
        return;
      }

      const namesList = results.map((row) => `<li>${row.name}</li>`).join("");
      res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
