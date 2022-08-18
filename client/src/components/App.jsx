import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import axios from "axios";


function App() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");

  const getTodos = () => axios.get("/get-todo")
  .then((res) => setTodo(res.data))
  .catch((err) => console.log(err))

  useEffect(() =>{
    getTodos()
  }, []);
   
  const addUpdateItem = () => {
    if (isUpdating === "") {
      axios.post("/save-todo", { text })
        .then((res) => {
          console.log(res.data);
          setText("");
          getTodos()
        })
        .catch((err) => console.log(err));
    }
    else{
      axios.post("/update-todo", { _id: isUpdating, text })
        .then((res) => {
          console.log(res.data);
          setText("");
          setUpdating("");
          getTodos()
        })
        .catch((err) => console.log(err));
    }
  }

  const deleteItem = (_id) => {
    axios.post("/delete-todo", { _id })
      .then((res) => {
        console.log(res.data); 
        getTodos()
      })
      .catch((err) => console.log(err));
  }

  const updateItem = (_id, text) => {
    setUpdating(_id);
    setText(text);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input 
          onChange={(e) => setText(e.target.value)} 
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              addUpdateItem()
            }
          }}
          type="text" 
          value={text}  
        />
        <button  onClick={addUpdateItem}>
          <span>{isUpdating ? "Update" : "Add"}</span>
        </button>
      </div>
      <div>
        <ul>
          {todo.map(item =>
            <ToDoItem
              key={item._id}
              id={item._id}
              text={item.text}
              remove={() => deleteItem(item._id)}
              update={() => updateItem(item._id, item.text)}
            />)}
        </ul>
      </div>
    </div>
  );
}

export default App;
