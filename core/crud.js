const fs = require("fs"); //lib do node
const DB_FILE_PATH = "./core/db";

console.log("[crud]");

function create(content){
    //precisa salvar o content no sistema
    fs.writeFileSync(DB_FILE_PATH, content);
    return content;
}

console.log(create("Hello world!!"));