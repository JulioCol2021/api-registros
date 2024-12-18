const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'seu-host-do-banco', // Exemplo: 'localhost' ou endereço do banco em produção
  user: 'seu-usuario',       // Usuário do banco
  password: '123',     // Senha do banco
  database: 'nome-do-banco'  // Nome do banco de dados
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

// Rota para retornar registros
app.get('/registros', (req, res) => {
  const query = 'SELECT * FROM registros'; // Ajuste para o nome correto da tabela
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Error fetching data' });
    }
    res.json(results); // Retorna os resultados como JSON
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
