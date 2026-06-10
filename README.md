# ITSM Ticket System

Sistema de gerenciamento de tickets (ITSM) desenvolvido em **TypeScript**, com validação robusta de dados, type safety e persistência em banco de dados.

Inspirado em plataformas como ServiceNow, esta API REST oferece operações CRUD completas com validação em tempo real, armazenamento persistente e melhor manutenibilidade através de tipos seguros.

## Tecnologias

- **Runtime**: Node.js
- **Linguagem**: TypeScript
- **Framework**: Express.js
- **Validação**: Zod (type-safe data validation)
- **Database**: SQLite (via sql.js)
- **Desenvolvimento**: ts-node (execução direta de TypeScript)

## Características

- **Type Safety:** TypeScript previne erros em tempo de compilação
- **Validação Robusta:** Zod valida entrada de dados com mensagens estruturadas
- **Persistência:** SQLite com sql.js, dados salvos em arquivo tickets.db
- **CRUD Completo:** GET, GET por ID, POST, PATCH
- **Transições de Status:** Apenas status válidos são permitidos (open, in progress, closed, archived)
- **Padrão Repository:** Separação clara entre lógica de negócio e acesso a dados
- **Respostas Padronizadas:** Status HTTP apropriados (200, 201, 400, 404)
- **Documentação em Código:** Tipos e interfaces servem como documentação

## Endpoints

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/tickets` | Lista todos os tickets | 200 |
| GET | `/tickets/:id` | Retorna ticket específico | 200 / 404 |
| POST | `/tickets` | Cria novo ticket | 201 / 400 |
| PATCH | `/tickets/:id` | Atualiza status do ticket | 200 / 400 / 404 |

## Como Executar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Servidor roda em `http://localhost:3000`

### Build (Compilar TypeScript → JavaScript)

```bash
npm run build
```

Gera pasta `dist/` com JavaScript compilado.

### Produção

```bash
npm run build
npm start
```

## Roadmap

### Fase 1: TypeScript e Validação (Completa)

- [x] Migração de JavaScript para TypeScript
- [x] Implementação de tipos seguros
- [x] Validação robusta com Zod
- [x] 4 rotas CRUD completas

### Fase 2: Persistência (Completa)

- [x] SQLite com sql.js
- [x] Padrão Repository para separação de responsabilidades
- [x] Dados persistem após reinício do servidor
- [x] Schema com AUTOINCREMENT para IDs

### Fase 3: Fluxo de Negócio

- [ ] DELETE ticket (completar CRUD)
- [ ] Máquina de estados (validar transições de status)
- [ ] Timestamps (createdAt, updatedAt)
- [ ] Auditoria (registrar quem fez cada ação)

### Fase 4: Qualidade e Escalabilidade

- [ ] Testes automatizados (Jest)
- [ ] Paginação em GET /tickets
- [ ] Filtros (por status, usuário, etc)
- [ ] Documentação Swagger/OpenAPI
- [ ] Logs estruturados
- [ ] Rate limiting

### Fase 5: Integração

- [ ] Autenticação JWT
- [ ] Integração com ServiceNow
- [ ] Webhooks para eventos

## Por que TypeScript?

- Detecção de erros: Encontra bugs antes de rodar
- Documentação automática: Tipos servem como documentação
- Refatoração segura: Alterar código com confiança
- Autocompletar: IDE oferece sugestões precisas
- Escalabilidade: Código mais mantível em projetos grandes

## Testando

Use Thunder Client (extensão do VSCode) ou Postman para testar os endpoints.

Exemplo com curl:

```bash
# Listar todos
curl http://localhost:3000/tickets

# Criar ticket
curl -X POST http://localhost:3000/tickets \
  -H "Content-Type: application/json" \
  -d '{"userID": 1, "title": "Bug no login", "status": "open"}'

# Atualizar status
curl -X PATCH http://localhost:3000/tickets/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "in progress"}'
```

## Desenvolvimento

Construído como portfolio de transição para desenvolvimento. Foco em code quality, boas práticas e aprendizado de conceitos core de backend.

## Licença

ISC
