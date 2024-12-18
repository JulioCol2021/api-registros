const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do banco de dados
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'registro',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Rota principal
app.get('/', (req, res) => {
    connection.query('SELECT * FROM registros', (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
