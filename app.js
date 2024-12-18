const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost', // Substitua com o host correto do banco
  user: 'root',      // Substitua pelo seu usuário
  password: '123',      // Substitua pela senha do banco
  database: 'nome_do_banco' // Substitua pelo nome do banco
});

// Conectar ao banco
db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Rota padrão (home)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Rota de registros
app.get('/registros', (req, res) => {
  db.query('SELECT * FROM registros', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Error fetching data' });
    }
    res.json(results);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
