//import { Router, Request, Response } = traz 3 coisas do Express
// Router = Para criar rotas;
// Request = Tipo de requisição que chega ao cliente;
// Responde = Tipo de resposta que você envia.

import { Router, Request, Response } from "express";

import { Ticket } from "../types"; 

import{ CreateTicketSchema, UpdateTicketSchema, ParamIdSchema, } from "../validators"

import { ZodError } from "zod";

import { getAllTickets, getTicketById, createTicket, updateTicket, saveDatabase } from "./database";

const router = Router();

// ROTA 1: GET /tickets - Lista todos os tickets
router.get("/", (req: Request, res: Response) => {
    const allTickets = getAllTickets();
    res.json(allTickets);
});

// ROTA 2: GET /tickets/:id - Retorna um ticket específico
router.get("/:id", (req:Request, res: Response) => {
    try{
        const { id } = ParamIdSchema.parse(req.params); // Se falhar → 400

        const ticket = getTicketById(id);
        if (!ticket) {
            res.status(404).json({
                message: "Ticket não encontrado." // Se não existe → 404
            });
            return;
        }
        res.json(ticket);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({
                message:"ID inválido",
                errors: error.issues
            });
        }
    }
});

// ROTA 3: POST /tickets - Criar novo ticket
router.post("/", (req:Request, res: Response) => {
    try {
        const data = CreateTicketSchema.parse(req.body);
        const novoTicket = createTicket(data);
        saveDatabase();
        res.status(201).json({
            message: "Ticket criado com sucesso.",
            ticket: novoTicket, 
        }); 
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({
                message: "Erro de validação.",
                errors: error.issues,
            });
        }
    }
});

// ROTA 4: PATCH /tickets/:id - Atualizar status do ticket
router.patch("/:id", (req: Request, res: Response) => {
    try {
        const { id } = ParamIdSchema.parse(req.params);
        const data = UpdateTicketSchema.parse(req.body);

        const ticket = updateTicket(id, data);
        if (!ticket) {
            res.status(404).json({
                message: "Ticket não encontrado.",
            });
            return;
        }
        saveDatabase();
        res.json({
            message: "Ticket atualizado com sucesso.",
            ticket,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({
                message: "Erro de validação.",
                errors: error.issues,
            });
        }
    }
});

export default router;