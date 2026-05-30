// ZOD É uma biblioteca que valida dados em tempo real. 
// Quando o cliente envia dados pro servidor, Zod checa se está certo.

import { z } from "zod";

const TicketStatusEnum = z.enum(["open", "in progress", "closed", "archived",]);

// Schema que é tipo receita de bolo, obriga que as coisas ESTEJAM do jeito que é.
export const CreateTicketSchema = z.object({
  userID: z                                             // Define que userID precisa ser número;
  .number()                                             // userID TEM que ser número;
  .int()                                                // TEM que ser número inteiro;
  .positive("userID deve ser um número positivo"),      // Tem que ser acima de 0;

  title: z      
  .string()                                             // Se alguém mandar 123, Zod rejeita;
  .min(3, "Título deve ter pelo menos 3 caracteres"),   // Se alguém mandar "ab", Zod rejeita;
  status: TicketStatusEnum                              
});


// Quando atualiza o ticket, SÓ o status muda.
export const UpdateTicketSchema = z.object({
    status: TicketStatusEnum
})

export const ParamIdSchema = z.object({
    id: z.string()
    .transform((val) => {
        const num = Number(val);
        if (isNaN(num)) throw new Error ("ID deve ser um número");  // if (isNaN(num)) = "se o número for NaN (inválido)"
            return num;                                             // throw new Error(...) = "lance um erro com essa mensagem"
    }),
});