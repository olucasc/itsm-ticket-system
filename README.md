# ITSM Ticket System

Sistema de gerenciamento de tickets (ITSM) desenvolvido em **TypeScript**, com validação robusta de dados e type safety.

Inspirado em plataformas como ServiceNow, esta API REST oferece operações CRUD completas com validação em tempo real e melhor manutenibilidade através de tipos seguros.

## 🚀 Tecnologias

- **Runtime**: Node.js
- **Linguagem**: TypeScript (migração de JavaScript)
- **Framework**: Express.js
- **Validação**: Zod (type-safe data validation)
- **Desenvolvimento**: ts-node (execução direta de TypeScript)

## ✨ Características

- ✅ **Type Safety**: TypeScript previne erros em tempo de compilação
- ✅ **Validação Robusta**: Zod valida entrada de dados com mensagens estruturadas
- ✅ **CRUD Completo**: GET, GET por ID, POST, PATCH
- ✅ **Transições de Status**: Apenas status válidos são permitidos
- ✅ **Respostas Padronizadas**: Status HTTP apropriados (201, 400, 404)
- ✅ **Documentação em Código**: Tipos e interfaces servem como documentação

## 📋 Endpoints

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/tickets` | Lista todos os tickets | 200 |
| GET | `/tickets/:id` | Retorna ticket específico | 200 / 404 |
| POST | `/tickets` | Cria novo ticket | 201 / 400 |
| PATCH | `/tickets/:id` | Atualiza status do ticket | 200 / 400 / 404 |

## 🏃 Como Executar

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


## 🔄 Roadmap
### Fase 1: TypeScript e Validação ✅
- [x] Migração de JavaScript para TypeScript
- [x] Implementação de tipos seguros (interfaces e types)
- [x] Validação robusta com Zod
- [x] 4 rotas CRUD completas

### Fase 2: Persistência e Segurança
- [ ] SQLite (persistência em arquivo)
- [ ] Autenticação JWT
- [ ] Middleware de rate limiting

### Fase 3: Fluxo de Negócio
- [ ] Máquina de estados (controlar transições de status)
- [ ] Timestamps (createdAt, updatedAt)
- [ ] Auditoria (registrar quem fez cada ação)

### Fase 4: Escalabilidade
- [ ] Paginação em GET /tickets
- [ ] Filtros (por status, usuário, etc)
- [ ] Soft delete
- [ ] Logs estruturados

## 📚 Por que TypeScript?

- **Detecção de erros**: Encontra bugs antes de rodar
- **Documentação automática**: Tipos servem como documentação
- **Refatoração segura**: Alterar código com confiança
- **Autocompletar**: IDE oferece sugestões precisas
- **Escalabilidade**: Código mais mantível em projetos grandes

## 🧪 Testando

Use Thunder Client (extensão do VSCode) ou Postman para testar os endpoints.

## 📄 Licença

ISC

---

**Desenvolvido com ❤️ em TypeScript**
