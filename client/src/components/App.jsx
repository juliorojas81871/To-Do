import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import axios from "axios";


function App() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");

  useEffect(() =>{
    axios.get("http://localhost:5000/get-todo")
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  });
   
  const addUpdateItem = () => {
    if (isUpdating === "") {
      axios.post("http://localhost:5000/save-todo", { text })
        .then((res) => {
          console.log(res.data);
          setText("");
        })
        .catch((err) => console.log(err));
    }
    else{
      axios.post("http://localhost:5000/update-todo", { _id: isUpdating, text })
        .then((res) => {
          console.log(res.data);
          setText("");
          setUpdating("");
        })
        .catch((err) => console.log(err));
    }
  }

  const deleteItem = (_id) => {
    axios.post("http://localhost:5000/delete-todo", { _id })
      .then((res) => console.log(res.data))
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
              // onChecked={deleteItem}
              remove={() => deleteItem(item._id)}
              update={() => updateItem(item._id, item.text)}
            />)}
        </ul>
      </div>
    </div>
  );
}

export default App;
