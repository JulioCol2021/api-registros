const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost', // Altere para suas credenciais
  user: 'root',
  password: 'sua_senha',
  database: 'registros'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados');
});

// Rota simples
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
