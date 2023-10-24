import { read } from "@db-crud-todo";

interface TodoRepositoryGetParams {
    page?: number;
    limit?: number;
}
interface TodoRepositoryGetOutput {
    todos: Todos[];
    total: number;
    pages: number;
}
function get({ page, limit }: TodoRepositoryGetParams = {}) {
    const currentPage = page || 1;
    const currentLimit = limit || 10;
    const ALL_TODOS = read();

    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = currentPage * currentLimit;
    const totalPages = Math.ceil(ALL_TODOS.length / currentLimit);
    const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);

    return {
        total: ALL_TODOS.length,
        todos: paginatedTodos,
        pages: totalPages,
    };
}

export const todoRepository = {
    get,
};

//Model/Schema
interface Todos {
    id: string;
    content: string;
    date: string;
    done: boolean;
}
