import express, { Express } from "express"; 
import { initializeDatabase, saveDatabase } from "./routes/database";
import ticketRoutes from "./routes/tickets";

const app: Express = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(express.json());
app.use("/tickets", ticketRoutes);

// Rota de teste
app.get("/", (req, res) => {
    res.send("API rodando.");
});

// Inicializa banco antes de abrir porta
(async () => {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    saveDatabase();
  });
})();