// Status de Ticket permitidos;
export type ticketStatus = "open" | "in progress" | "closed" | "archived";

// Interface que garante que dados como números sejam inseridos em id e UserID
// Assim como garante texto no title.
export interface Ticket {
    id: number;
    userID: number;
    title: string;
    status: ticketStatus
}

// Interface que valida se os campos estão preenchidos corretamente.
export interface CreateTocletPayload {
    userID: number;
    title: string;
    status: ticketStatus;
}

// Interface que atualiza SOMENTE o status do ticket.
export interface UpdateTicketPayload {
    status: ticketStatus;
}

