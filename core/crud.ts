import fs from "fs"; //ES6
//const fs = require("fs"); //lib do node
const DB_FILE_PATH = "./core/db";

console.log("[crud]");

interface Todo{
    date: String;
    content: string;
    done: boolean;
}

function create(content: string){
    const todo: Todo ={
        date: new Date().toISOString(),
        content: content,
        done: false,
    };

    const todos: Array <Todo> =[
        ...read(), // read trabalha com array, então espalhamos o array
        todo,
    ];

    //precisa salvar o content no sistema
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos,
        dogs: [],
    }, null, 2));
    return content;
}

function read(): Array<Todo>{
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(dbString || "{}"); // se vazio o arquivo retorna o "{}"
    if(!db.todos){ //fail fast validation: Não tem nada preenchido? Ja para!!
        return [];
    }
    return db.todos;
}

function CLEAR_DB(){
    fs.writeFileSync(DB_FILE_PATH, "");
}

//[SIMULAÇÃO]

CLEAR_DB();

create("primeira TODO");
create("segunda TODO");
console.log(read());
