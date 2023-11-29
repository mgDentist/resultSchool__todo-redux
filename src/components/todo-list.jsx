import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "../App.module.css"
import { fetchTodos, addTodo, deleteTodo, editTodo } from "../store/actions/todoActions";


const GetTodos = () => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.todos);
    const [newTodo, setNewTodo] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const addTodoHandler = () => {
        dispatch(addTodo(newTodo));
        setNewTodo("");
    };

    const deleteTodoHandler = (id) => {
        dispatch(deleteTodo(id));
    };

    const startEditing = (id, title) => {
        setEditingTodo(id);
        setEditedTitle(title);
    };

    const editTodoHandler = () => {
        dispatch(editTodo(editingTodo, editedTitle));
        setEditingTodo(null);
        setEditedTitle("");
    };

    const handleNewTodoChange = (event) => {
        setNewTodo(event.target.value);
    };

    const handleEditedTitleChange = (event) => {
        setEditedTitle(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h1>Список дел</h1>
            <div>
                <input
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Поиск дела"
                />
            </div>
            <div>
                <input
                    className={style.todoListItemInput}
                    value={newTodo}
                    onChange={handleNewTodoChange}
                    placeholder="Добавить новое дело"
                />
                <button
                    className={style.todoListItemButton}
                    onClick={addTodoHandler}>Добавить</button>
            </div>
            <ul className={style.todoList}>
                {filteredTodos.map((todo) => (
                    <li key={todo.id}>
                        {editingTodo === todo.id ? (
                            <div>
                                <input
                                    className={style.todoListItemInput}
                                    value={editedTitle}
                                    onChange={handleEditedTitleChange}
                                />
                                <button
                                    className={style.todoListItemButton}
                                    onClick={editTodoHandler}>Сохранить</button>
                            </div>
                        ) : (
                            <div className={style.wrapper}>
                                {todo.title}
                                <div className={style.innerWrapper}>
                                    <button
                                        className={style.todoListItemButton}
                                        onClick={() => startEditing(todo.id, todo.title)}>
                                        Редактировать
                                    </button>
                                    <button
                                        className={style.todoListItemButton}
                                        onClick={() => deleteTodoHandler(todo.id)}>
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetTodos;
