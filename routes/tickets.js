
const express = require("express")

const router = express.Router()

/* --------------------------------------------------------------- */

// FUNÇÃO que mostra todos os tickets "criados"
const tickets = [ 
    {
    id: 1,
    userID: 1,
    title: "Erro no login",
    status: "open"
    },

{
    id: 2,
    userID: 1,
    title: "VPN caiu",
    status: "in progress"
    },

{
    id: 3,
    userID: 2,
    title: "Sistema lento",
    status: "open"
    },

]

/* --------------------------------------------------------------- */

// ROTA PARA PUXAR TODOS OS TICKETS
router.get("/", (req,res) => {
    res.json(tickets)
})

/* --------------------------------------------------------------- */

// ROTA PARA PUXAR TICKET ESPECÍFICO
router.get("/:id", (req,res) => {

    const id = Number(req.params.id)

    const ticket = tickets.find(
        ticket => ticket.id === id
    )

    if (!ticket) {
        return res.status(404).json({
            message: "Ticket não encontrado."
        })
    }

    res.json(ticket)
})


/* --------------------------------------------------------------- */

    // ROTA PARA CRIAR/INSERIR DADOS
    // FUNÇÕES CRIADAS:
        // novoTicket = Criar novo ticket a cada comando de POST;
        // ticketExistente = Para validar se não haverá duplicidade de tickets com mesmo ID;

    router.post("/", (req,res) => {
        
        const {userID, title, status} = req.body

        const novoTicket = {
            id: tickets.length + 1,
            userID,
            title,
            status
        }

        tickets.push(novoTicket)

        res.status(201).json ({
            message: "Ticket criado com sucesso",
            ticket: novoTicket
        })

    })


/* --------------------------------------------------------------- */

// ROTA QUE ATUALIZA STATUS DO TICKET
router.patch("/:id", (req, res) => {

    const id = Number (req.params.id)

    const ticket = tickets.find(
        ticket => ticket.id === id
    )

    if (!ticket) {
        return res.status(404).json({
            message: "Ticket não encontrado."
        })
    }

    // STATUS PERMITIDOS:

    const { status } = req.body

    const allowedStatus = [
    "open",
    "in progress",
    "closed",
    "arquived"
    ]

    // VALIDAÇÃO
    if (!allowedStatus.includes(status)) {
        return res.status(400).json({
            message: "Status inválido."
        })
    }

    // ATUALIZA STATUS
    ticket.status = status

    // RESPOSTA
    res.json({
        message: "Ticket atualizado com sucesso!",
        ticket
    })

})

/* --------------------------------------------------------------- */



module.exports = router
