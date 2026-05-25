// Importa o framework Express para criar a API REST.
const express = require("express")

// Inicializa a aplicação Express.
const app = express()

// Middleware global para processar JSON no corpo das requisições.
app.use(express.json())

// Importa as rotas de tickets e monta o roteador em /tickets.
const ticketRoutes = require(`./routes/tickets`)
app.use(`/tickets`, ticketRoutes)

// Rota principal de teste.
// GET / => retorna uma mensagem simples para confirmar que a API está funcionando.
app.get(`/`, (req, res) => {
    res.send("API rodando")
})

// Inicia o servidor na porta 3000.
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})

// Para executar: node app.js
// Acesse http://localhost:3000/ no navegador para ver a resposta "API rodando".