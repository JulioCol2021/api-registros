const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware para JSON
app.use(express.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário do MariaDB
    password: '', // Substitua pela sua senha
    database: 'registro' // Nome do banco de dados
});

// Conectar ao banco
db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MariaDB');
});

// Rota para buscar todos os registros
app.get('/registros', (req, res) => {
    db.query('SELECT * FROM registros', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
});
