const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;

let db;

// Função para conectar ao banco de dados com lógica de reconexão
function connectDB() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      setTimeout(connectDB, 5000); // Tenta novamente em 5 segundos
    } else {
      console.log('Connected to the database2!');
    }
  });

  // Limpeza da conexão em caso de erro fatal
  db.on('error', (err) => {
    console.error('Database connection error:', err);
    if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
      db.destroy(); // Limpa a conexão em caso de erro fatal
      setTimeout(connectDB, 5000); // Tenta reconectar após 5 segundos
    }
  });
}

connectDB();
console.log('----------------------------------------------------------------');
app.get('/', (req, res) => {
  db.query('SELECT * FROM people', (err, results) => {
    if (err) {
      return res.status(500).send('Error querying database');
    }
    res.send(`<h1>Full Cycle Rocks!</h1><pre>${JSON.stringify(results, null, 2)}</pre>`);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
