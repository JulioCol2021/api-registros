const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 10800;

// Configuração do banco de dados
const db = mysql.createConnection({
  host: '127.0.0.1', // Localhost
  user: 'root',      // Usuário padrão do MySQL
  password: '123',   // Senha fornecida
  database: 'registro', // Nome do banco de dados correto
  port: 3306         // Porta padrão do MySQL
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    process.exit(1); // Encerrar o processo em caso de erro
  }
  console.log('Conexão bem-sucedida com o banco de dados MySQL.');
});

// Rota para testar a API
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// Rota para listar os registros
app.get('/registros', (req, res) => {
  const query = 'SELECT * FROM registros';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a query:', err.message);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(results);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
