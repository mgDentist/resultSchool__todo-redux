// Действия
export const setTodos = (todos) => ({
    type: "SET_TODOS",
    payload: todos
});

export const addTodoSuccess = (todo) => ({
    type: "ADD_TODO",
    payload: todo
});

export const deleteTodoSuccess = (id) => ({
    type: "DELETE_TODO",
    payload: id
});

export const editTodoSuccess = (id, title) => ({
    type: "EDIT_TODO",
    payload: { id, title }
});

// Thunk-функции
export const fetchTodos = () => {
    return (dispatch) => {
        fetch("http://localhost:3001/todos")
            .then((response) => response.json())
            .then((data) => dispatch(setTodos(data)))
            .catch((error) => console.error("Ошибка: ", error));
    };
};

export const addTodo = (title) => {
    return (dispatch) => {
        fetch("http://localhost:3001/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        })
            .then((response) => response.json())
            .then((data) => dispatch(addTodoSuccess(data)))
            .catch((error) => console.error("Ошибка: ", error));
    };
};

export const deleteTodo = (id) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "DELETE",
        })
            .then(() => dispatch(deleteTodoSuccess(id)))
            .catch((error) => console.error("Ошибка: ", error));
    };
};

export const editTodo = (id, title) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        })
            .then(() => dispatch(editTodoSuccess(id, title)))
            .catch((error) => console.error("Ошибка: ", error));
    };
};
