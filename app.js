const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'registro',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Exemplo de rota
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    connection.query('SELECT * FROM registros', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
