  import React from "react";
  import { useState, useRef} from "react";
  import Alert from "react-bootstrap/Alert";

  function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [count, setCount] = useState(0);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const inputRef = useRef(null);


    function handleChange(e) {
      setInputValue(e.target.value);
      setShowErrorMsg(false);
    }

    function handleSubmit(e) {
      e.preventDefault();
      if (inputValue == "") {
          setShowErrorMsg(true);
          inputRef.current.focus();
      } 
      else {
        var x = {
          id: count,
          value: inputValue,
          inactive: true,
          isdone: false,
          border: "none",
          textDecor: "none",
          backGr: "#edede2",
        };
        setTodos([...todos, x]);
        setInputValue("");
        setCount(count + 1);
        setShowErrorMsg(false);
      }
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
            ? { ...todo, backGr: "#ffff", border: "1px solid", inactive: false }
            : { ...todo, backGr: "#edede2", border: "none", inactive: true }
        )
      );
    }
    function handleOutUpdate(e) {
      const updatedId = e.target.id;
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id == updatedId
            ? { ...todo, backGr: "#edede2", border: "none", inactive: false }
            : { ...todo, backGr: "#edede2", border: "none", inactive: true }
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
      const updatedId = e.target.getAttribute("_key");
      const checked = e.target.checked;

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id == updatedId
            ? checked
              ? { ...todo, textDecor: "line-through", isdone: true }
              : { ...todo, textDecor: "none", isdone: false }
            : todo
        )
      );
    }

    return (
      <div style={{ margin: "0 auto", width: "800px", display: "flex" }}>
        <div style={{ margin: "0 auto", width: "300px" }}>
          <center>
            <h3>Todo List</h3>
            {showErrorMsg && <h5 id="fill_msg" style={{color:"red"}}>Must fill in the box</h5>}
          </center>
          <form style={{ margin: "0 auto", width: "220px", display: "flex" }}>
            <input
              style={{ width: "85%" }}
              type="text"
              value={inputValue}
              onChange={handleChange}
              ref={inputRef}
            />
            <button style={{ width: "15%" }} onClick={handleSubmit}>
              Add
            </button>
          </form>
          <form>
            <ul style={{ listStyle: "none" }}>
              {todos.map((todo) =>
                todo.isdone == false ? (
                  <li key={todo.id}>
                    <input
                      type="checkbox"
                      checked={todo.isdone}
                      _key={todo.id}
                      onChange={doneTask}
                    />
                    <input
                      type="text"
                      id={todo.id}
                      onBlur={handleOutUpdate}
                      onClick={handleEdit}
                      onChange={onTypingTask}
                      style={{
                        border: todo.border,
                        textDecoration: todo.textDecor,
                        background: todo.backGr,
                      }}
                      value={todo.value}
                      readOnly={todo.inactive}
                    />
                    <button value={todo.id} type="button" onClick={handleDelete}>
                      Delete
                    </button>
                  </li>
                ) : (
                  ""
                )
              )}
            </ul>
          </form>
        </div>
        <form style={{ margin: "0 auto", width: "300px" }}>
          <center>
            <h3>Done List</h3>
          </center>

          <ul style={{ listStyle: "none" }}>
            {todos.map((todo) =>
              todo.isdone == true ? (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.isdone}
                    _key={todo.id}
                    onChange={doneTask}
                  />
                  <input
                    type="text"
                    id={todo.id}
                    onBlur={handleOutUpdate}
                    onClick={handleEdit}
                    onChange={onTypingTask}
                    style={{
                      border: todo.border,
                      textDecoration: todo.textDecor,
                      background: todo.backGr,
                    }}
                    value={todo.value}
                    readOnly={todo.inactive}
                  />
                  <button value={todo.id} type="button" onClick={handleDelete}>
                    Delete
                  </button>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        </form>
      </div>
    );
  }

  export default TodoList;
