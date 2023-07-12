import fs from "fs"; //ES6
import { v4 as uuid } from 'uuid';
//const fs = require("fs"); //lib do node
const DB_FILE_PATH = "./core/db";

console.log("[crud]");

interface Todo{
    id: string;
    date: String;
    content: string;
    done: boolean;
}

function create(content: string): Todo{
    const todo: Todo ={
        id: uuid(),
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
    }, null, 2)); //replace null e espaçamento 2
    return todo;
}

function read(): Array<Todo>{
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(dbString || "{}"); // se vazio o arquivo retorna o "{}"
    if(!db.todos){ //fail fast validation: Não tem nada preenchido? Ja para!!
        return [];
    }
    return db.todos;
}

function update(id: string, partialTodo: Partial<Todo>){
    let updatadedTodo;
    const todos = read();
    todos.forEach((currentTodo) => {
        const isToUpdate = currentTodo.id === id;
        if(isToUpdate){
            updatadedTodo = Object.assign(currentTodo, partialTodo); // qqr valor do partialTodo altera o currentTodo
        }
    });

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos
    }, null, 2));

    if(!updatadedTodo){
        throw new Error("Please, provide another ID")
    }
    return updatadedTodo;
}

function updateContentById(id: string, content: string): Todo{
    return update(id, {
        content,
    });
}

function CLEAR_DB(){
    fs.writeFileSync(DB_FILE_PATH, "");
}

//[SIMULAÇÃO]

CLEAR_DB();

create("primeira TODO");
create("segunda TODO1");
const terceiraToDo = create("terceira TODO1");

//update(terceiraToDo.id, {
//    content: "Atualizada",
//    done: true
//});// update(dequem, oque)

updateContentById(terceiraToDo.id, "Atualizada");
console.log(read());

