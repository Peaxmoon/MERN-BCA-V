import { createContext, useContext } from "react";


export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo Msg",
            Completed: false,
        },
    ]   
    theme: dark
});

export const useTodo = () => {
    return useContext(TodoContext);
}