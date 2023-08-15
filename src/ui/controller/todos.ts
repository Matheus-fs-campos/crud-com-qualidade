async function get() {
    return fetch("/api/todos").then(async (respostaDoServidor) => {
        const todosString = await respostaDoServidor.text();
        const todosFromServer = JSON.parse(todosString);
        //todos = [...todosFromServer];
        return todosFromServer;
    });
}

export const todoController = {
    get,
};
