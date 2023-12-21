import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [count, setCount] = useState(0);

    function handleChange(e) {
        setInputValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        var x = {
            id: count,
            value: inputValue,
            inactive: true,
            isdone: false,
            border: "none",
            textDecor: "none",
        };
        setTodos([...todos, x]);
        setInputValue("");
        setCount(count + 1);
    }
    function handleDelete(e) {
        var index = e.target.value;
        var result = todos.filter((todo) => todo.id != index);
        setTodos(result);
    }
    function handleEdit(e) {
        const updatedId = e.target.id;
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id == updatedId
                    ? { ...todo, border: "1px solid", inactive: false }
                    : { ...todo, border: "none", inactive: true }
            )
        );
    }
    function handleOutUpdate(e) {
        const updatedId = e.target.id;
        setTodos((prevTodos) =>
        prevTodos.map((todo) =>
        todo.id == updatedId
        ? { ...todo, border: "none", inactive: false }
        : { ...todo, border: "none", inactive: true }
        )
        );
    }
    function onTypingTask(e) {
        const updatedId = e.target.id;
        setTodos((prevTodos) =>
        prevTodos.map((todo) =>
        todo.id == updatedId ? { ...todo, value: e.target.value } : todo
        )
        );
    }
    function doneTask(e) {
        const updatedId = e.target.id;
        const checked = e.target.checked;
        
        setTodos((prevTodos) =>
        prevTodos.map((todo) =>
        todo.id == updatedId && checked
        ? { ...todo, textDecor: "line-through", isdone: checked }
        : { ...todo, textDecor: "none", isdone: checked  }
        ),
        
        );
        

        
    }

    return (
        <div style={{ margin: "0 auto", width: "800px",display: "flex" }}>
            <div style={{ margin: "0 auto", width: "300px" }}>
                <center><h1>Todo List</h1></center>
            <form style={{ margin: "0 auto", width: "220px", display: "flex" }}>
                <input style={{ width: "85%" }} type="text" value={inputValue} onChange={handleChange} />
                <button style={{ width: "15%" }} onClick={handleSubmit}>Add</button>
            </form>
            <form>
                <ul style={{ listStyle: "none" }}>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <input type="checkbox" id={todo.id} onChange={doneTask} />
                            <input
                                type="text"
                                id={todo.id}
                                onBlur={handleOutUpdate}
                                onClick={handleEdit}
                                onChange={onTypingTask}
                                style={{ border: todo.border, textDecoration: todo.textDecor }}
                                value={todo.value}
                                readOnly={todo.inactive}
                            />
                            <button value={todo.id} type="button" onClick={handleDelete}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </form>
            </div>
            <form style={{ margin: "0 auto", width: "300px" }}>
            <center><h1>Done List</h1></center>
                
                <ul style={{ listStyle: "none" }}>
                    {todos.map((todo) => ( 
                        <li key={todo.id}>
                            <input type="checkbox" id={todo.id} onChange={doneTask} />
                            <input
                                type="text"
                                id={todo.id}
                                onBlur={handleOutUpdate}
                                onClick={handleEdit}
                                onChange={onTypingTask}
                                style={{ border: todo.border, textDecoration: todo.textDecor }}
                                value={todo.value}
                                readOnly={todo.inactive}
                            />
                            <button value={todo.id} type="button" onClick={handleDelete}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
}

export default TodoList;
