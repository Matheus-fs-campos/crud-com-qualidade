import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
    page: number;
}
async function get(params: TodoControllerGetParams) {
    //console.log(params);
    return todoRepository.get({
        page: params.page,
        limit: 2,
    });
}

export const todoController = {
    get,
};
