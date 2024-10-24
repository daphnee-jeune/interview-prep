import { useState } from "react";
import "./App.css";

function App() {
  const [newTodoItem, setNewTodoItem] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  // add new todo
  const addTodo = () => {
    if (newTodoItem.trim() !== "") {
      setTodoItems([...todoItems, newTodoItem.trim()]);
      setNewTodoItem("");
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todoItems.filter((todo, i) => i !== index);
    setTodoItems(updatedTodos);
  };
  return (
    <>
      <h1>Todo list</h1>
      <section>
        <input
          type="text"
          placeholder="Enter todo"
          value={newTodoItem}
          onChange={(e) => setNewTodoItem(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </section>
      <ul>
        {todoItems.map((todo, i) => (
          <li key={i}>
            {todo} <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
