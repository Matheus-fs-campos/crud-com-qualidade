import React from "react";
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { todoController } from "@ui/controller/todo";
import next from "next";

// const bg = "https://mariosouto.com/cursos/crudcomqualidade/bg";
const bg = "/bg.jpeg"; // inside public folder

//let todos = [];
//- React useEffect(() => {}, [])
//--Roda só no LOAD da página
//--Roda no load do componente
interface HomeTodo {
    id: string;
    content: string;
}

function HomePage() {
    //const [initialLoadComplete, setInitialLoadComplete] = React.useState(false);
    const initialLoadComplete = React.useRef(false);
    const [totalPages, setTotalPages] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);
    const [todos, setTodos] = React.useState<HomeTodo[]>([]);
    const homeTodos = todoController.filterTodosByContent<HomeTodo>(
        search,
        todos
    );

    //console.log("totalpages:", totalPages);
    const hasMorePages = totalPages > page;
    const hasNoTodos = homeTodos.length === 0 && !isLoading;

    //carrega informações onload
    React.useEffect(() => {
        //setInitialLoadComplete(true);
        //console.log(initialLoadComplete.current);
        if (!initialLoadComplete.current) {
            todoController
                .get({ page })
                .then(({ todos, pages }) => {
                    //console.log(todos);
                    setTodos(todos);
                    setTotalPages(pages);
                })
                .finally(() => {
                    setIsLoading(false);
                    initialLoadComplete.current = true;
                });
        }
        //console.log(page);
    }, []);

    return (
        <main>
            <GlobalStyles themeName="devsoutinho" />
            <header
                style={{
                    backgroundImage: `url('${bg}')`,
                }}
            >
                <div className="typewriter">
                    <h1>O que fazer hoje?</h1>
                </div>
                <form>
                    <input type="text" placeholder="Correr, Estudar..." />
                    <button type="submit" aria-label="Adicionar novo item">
                        +
                    </button>
                </form>
            </header>

            <section>
                <form>
                    <input
                        type="text"
                        placeholder="Filtrar lista atual, ex: Dentista"
                        onChange={function handleSearch(event) {
                            //console.log("change!", event.target.value);
                            setSearch(event.target.value);
                        }}
                    />
                </form>

                <table border={1}>
                    <thead>
                        <tr>
                            <th align="left">
                                <input type="checkbox" disabled />
                            </th>
                            <th align="left">Id</th>
                            <th align="left">Conteúdo</th>
                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {homeTodos.map((todo) => {
                            return (
                                <tr key={todo.id}>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td>{todo.id.substring(0, 4)}</td>
                                    <td>{todo.content}</td>
                                    <td align="right">
                                        <button data-type="delete">
                                            Apagar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {isLoading && (
                            <tr>
                                <td
                                    colSpan={4}
                                    align="center"
                                    style={{ textAlign: "center" }}
                                >
                                    Carregando...
                                </td>
                            </tr>
                        )}

                        {hasNoTodos && (
                            <tr>
                                <td colSpan={4} align="center">
                                    Nenhum item encontrado
                                </td>
                            </tr>
                        )}

                        {hasMorePages && (
                            <tr>
                                <td
                                    colSpan={4}
                                    align="center"
                                    style={{ textAlign: "center" }}
                                >
                                    <button
                                        data-type="load-more"
                                        onClick={() => {
                                            setIsLoading(true);
                                            const nextPage = page + 1;
                                            setPage(nextPage);
                                            todoController
                                                .get({ page: nextPage })
                                                .then(({ todos, pages }) => {
                                                    //console.log(todos);
                                                    setTodos((oldTodos) => {
                                                        return [
                                                            ...oldTodos,
                                                            ...todos,
                                                        ];
                                                    });
                                                    setTotalPages(pages);
                                                })
                                                .finally(() => {
                                                    setIsLoading(false);
                                                });
                                        }}
                                    >
                                        Página {page}, Carregar mais{" "}
                                        <span
                                            style={{
                                                display: "inline-block",
                                                marginLeft: "4px",
                                                fontSize: "1.2em",
                                            }}
                                        >
                                            ↓
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default HomePage;
