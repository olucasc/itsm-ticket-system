# Ticket System Backend

Sistema de gerenciamento de tickets inspirado em plataformas ITSM como ServiceNow. API REST implementada com Node.js e Express para criar, consultar e atualizar tickets com validação de status.

## Funcionalidades

- Listar todos os tickets
- Consultar ticket por ID
- Criar novo ticket
- Atualizar status com validação de estados permitidos
- Respostas padronizadas com status HTTP apropriado

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Testes**: Thunder Client / Postman
- **Versionamento**: Git/GitHub

## Como executar

```bash
npm install
node app.js
```

Acesse `http://localhost:3000` para testar.

## Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tickets` | Lista todos os tickets |
| GET | `/tickets/:id` | Retorna ticket específico |
| POST | `/tickets` | Cria novo ticket |
| PATCH | `/tickets/:id` | Atualiza status do ticket |

### Exemplo POST /tickets

```json
{
  "userID": 1,
  "title": "Sistema lento",
  "status": "open"
}
```

## Roadmap

**Fase 2: Persistência e segurança**
- [ ] Migrar para SQLite (substituir array em memória)
- [ ] Autenticação JWT (proteger endpoints)
- [ ] Validação de entrada mais robusta (Zod ou Joi)

**Fase 3: Fluxo de negócio**
- [ ] Máquina de estados (qual status pode transicionar para qual)
- [ ] Timestamps (createdAt, updatedAt)
- [ ] Auditoria (quem fez qual ação)

**Fase 4: Escalabilidade**
- [ ] Controle de permissões por usuário
- [ ] Soft delete em vez de exclusão física
- [ ] Logs estruturados
