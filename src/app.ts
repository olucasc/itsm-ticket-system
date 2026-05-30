import express, { Express } from "express"; 
import ticketRoutes from "./routes/tickets";

const app: Express = express();


//Abre a porta 3000 para servidor;
const PORT = 3000;

app.use(express.json());
app.use("/tickets", ticketRoutes);

//app.use adiciona um middleware;
// express.json() = middleware que processa o JSON;
// O que é middleware? É uma função que processa requisições 
// ANTES de chegar na rota.

// Por que precisa?
// Sem isso, quando o cliente envia {"userID": 1, "title": "Erro"}
// o servidor não consegue ler. Co misso, o servidor converte o texto
// JSON em um objeto JS.
app.use(express.json());


// app.get() é quando alguém faz requisição GET
// Na rota "/" (raiz, localhost:3000)
// req e res = função que recebe requisição (req) e resposta (res) 
// Rota de teste simples para testar se o servidor está rodando.
app.get("/", (req,res) => {
    res.send("API rodando.")
})

// app.listen "escuta" as requisições
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})