import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";
import TodoList from "./components/TodoList"
import header from './header.png';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<div style={{background:"#edede2", height:"1024px"}} >
<img src={header}></img>
<TodoList />
</div>
);
