const express = require('express');
const path = require('path');
const rotas = require('./routes/router');
require('dotenv').config(); // Certifique-se de carregar as variáveis de ambiente

const app = express();
const server = require('http').createServer(app);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração de views
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Rotas
app.use("/", rotas);

console.log("Servidor ouvindo na porta 3000");
server.listen(3000);
