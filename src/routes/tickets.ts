//import { Router, Request, Response } = traz 3 coisas do Express
// Router = Para criar rotas;
// Request = Tipo de requisição que chega ao cliente;
// Responde = Tipo de resposta que você envia.

import { Router, Request, Response } from "express";
import { Ticket } from "../types"; 
import{
    CreateTicketSchema,
    UpdateTicketSchema,
    ParamIdSchema,
} from "../validators"

import { ZodError } from "zod";

const router = Router();

const tickets: Ticket[] = [
    {
        id: 1,
        userID: 1,
        title: "Erro no login",
        status: "open",
    },
    {
       id: 2,
        userID: 1,
        title: "VPN caiu",
        status: "in progress",
    },
    {
        id: 3,
        userID: 2,
        title: "Sistema lento",
        status: "open",
    },
];


// ROTA 1: GET /tickets - Lista todos os tickets
router.get("/", (req: Request, res: Response) => {
    res.json(tickets);
});


// ROTA 2: GET /tickets/:id - Retorna um ticket específico
router.get("/:id", (req:Request, res: Response) => {
    try{
        const { id } = ParamIdSchema.parse(req.params); // Se falhar → 400

        const ticket = tickets.find((t) => t.id === id);
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
        const novoTicket: Ticket = {
            id: tickets.length > 0 ? Math.max(...tickets.map((t) => t.id)) + 1 : 1,
            userID: data.userID,
            title: data.title,
            status: data.status,
        };

        tickets.push(novoTicket)
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
        const ticket = tickets.find((t) => t.id === id);
        if (!ticket) {
            res.status(404).json({
                message: "Ticket não encontrado.",
            });
            return;
        }
        ticket.status = data.status;
        res.json({
            message: "Ticket atualizado com sucesso!",
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
