// Traz sql,js para o arquivo (initSqlJs que é a função para inicializar o SQL.js e Database que é a classe para manipular o banco de dados)
import initSqlJs, { Database } from "sql.js";

//Traz a biblioteca nativa do Node.js que lê e escreve arquivos. fs = file system
// Vai salvar no DB em um arquivo chamado "tickets.db" na raiz do projeto, quando o sv reiniciar vai puxar esse arquivo.
import fs from "fs";

//Traz a a biblioteca nativa do Node.js que trabalha com caminhos de arquivo de forma segura.
// path = caminho.
import path from "path";

import { Ticket, CreateTicketPayload, ticketStatus, UpdateTicketPayload } from "../types";


//Define uma constante que aponta para onde o arquivo do banco vai ficar.
const DB_PATH = path.join(__dirname, "tickets.db");

// declara uma variável chamada db que vai ser do tipo Database.
let db: Database;

// Define uma função chamada initializeDatabase, já o export permite que outros arquivos (app.ts) usem essa função.
// async significa que essa função vai fazer algo que demora (como ler arquivo do disco)
    export async function initializeDatabase() {

        //Chama a função InitSqlJs para inicializar sql.js
        // Await = "espera isso terminar antes de continuar", ou seja, espera o SQL.js ser inicializado para depois criar o banco de dados.
        const SQL = await initSqlJs();

        if (fs.existsSync(DB_PATH) ) 
            {
            // Lê o arquivo tickets.db do disco e guarda o conteúdo em uma constante fileBuffer. Buffer = é como um "container" que guarda dados em memória.
            const fileBuffer = fs.readFileSync(DB_PATH);

            //Passa o fileBuffer (os dados do arquivo) para sql.js criar um objeto Database. Guarda esse objeto na variável db
            db = new SQL.Database(fileBuffer);
        } 
        else    {
            // Cria um novo banco de dados vazio. Sem passar nenhum arquivo, sql.js cria um banco na memória do zero.
            db = new SQL.Database();
        }
            // Começa a executar um comando SQL. O backtick (` ) permite você escrever string multilinhas (SQL é meio longo, fica melhor em várias linhas).
            db.run(`
                CREATE TABLE IF NOT EXISTS tickets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userID INTEGER NOT NULL,
                title TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT "open");
                 `);
    }

    // Define a primeira função CRUD chamada getAllTickets. Retorna um array de Ticket (tipo que você definiu em types.ts).
    export function getAllTickets(): Ticket[] {

            //  Executa a query SQL SELECT * FROM tickets no banco. SELECT * = "me dá todas as colunas". FROM tickets = "da tabela tickets". Guarda o resultado em result.
            const result = db.exec ("SELECT * FROM tickets;");

            // Verifica se o banco retornou vazio. result é um array. Se result.length === 0, significa que não há dados (a query retornou nada).
            if (result.length === 0) {
                return [];
            }

            // sql.js retorna um array de objetos. result[0] é o primeiro (e único) objeto. .values pega a lista de linhas (cada linha é um array com [id, userID, title, status]).
            const rows = result[0].values;

            // Transforma cada linha (array) em um objeto Ticket. .map() é um método que percorre cada item do array e transforma.
            return rows.map ((row) => ({
                id: row[0] as number,
                userID: row[1] as number,
                title: row[2] as string,
                status: row[3] as ticketStatus
            }));
    }

    // Define a segunda função CRUD. Recebe um id (número) e retorna um Ticket OU null (se não encontrar).
    export function getTicketById(id: number): Ticket | null {
                    //Executa uma query SQL que busca um ticket específico. WHERE id = ${id} filtra apenas o ticket com aquele ID. Guarda o resultado em result.
                    const result = db.exec(`SELECT * FROM tickets WHERE id = ${id};`);
                    
                    // erifica se o banco retornou vazio (ticket com aquele ID não existe).
                    if (result.length === 0) {
                        return null;
                    }

                    //  Extrai a primeira (e única) linha do resultado. result[0].values[0] pega a primeira linha da primeira tabela.
                    const row = result[0].values[0];
                    return {
                        id: row[0] as number,
                        userID: row[1] as number,
                        title: row[2] as string,
                        status: row[3] as ticketStatus
                    };
    }

    //Define a terceira função CRUD. Recebe um CreateTicketPayload (userID, title, status) e retorna o Ticket completo (com id gerado automaticamente).
    export function createTicket(data: CreateTicketPayload): Ticket {
            db.run(`
                INSERT INTO tickets (userID, title, status)
                VALUES (${data.userID}, '${data.title}', '${data.status}');
                `);

                // Depois de inserir, busca o ID que foi gerado automaticamente. last_insert_rowid() é uma função SQL que retorna o último ID criado.
                const result = db.exec("SELECT last_insert_rowid() as id;");

                //Extrai o ID gerado. result[0].values[0][0] navega pela estrutura sql.js para pegar o valor. Força para number.
                const newID = result[0].values[0][0] as number;
                return {
                    id: newID,
                    userID: data.userID,
                    title: data.title,
                    status: data.status,
                };
    }

    //  Define a quarta função CRUD. Recebe um id (qual ticket) e UpdateTicketPayload (só status). Retorna o ticket atualizado OU null (se ticket não existe).
    export function updateTicket(id: number, data: UpdateTicketPayload): Ticket | null {

        // Executa um comando UPDATE. Muda o status da linha onde id bate com o que você procura.
        db.run(`UPDATE tickets SET Status = '${data.status}' WHERE id = ${id};`);

        // Busca o ticket atualizado e retorna. Reutiliza a função getTicketById que você já escreveu.
        return getTicketById(id);
    }

    // Define uma função que salva o banco de dados em arquivo. Sem isso, quando reinicia o servidor, todos os dados desaparecem.
    export function saveDatabase() {

        //Exporta o banco de dados como um array de bytes. db.export() é uma função sql.js que "fotografa" todo o estado do banco.
        const data = db.export();

        //Converte o array de bytes para um Buffer (formato nativo do Node.js para trabalhar com dados binários).
        const buffer = Buffer.from(data);

        //Escreve o buffer (os dados do banco) no arquivo tickets.db no disco. writeFileSync = escreve de forma síncrona (instantânea).
        fs.writeFileSync(DB_PATH, buffer); 
    }