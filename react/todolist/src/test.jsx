import React, { useState } from 'react'


function test() {
 const [task, setTask] = useState("")
 const [todos, setTodos] = useState([])
 const handleInputChange = (e) => setTask(e.target.value)
 const addTodo = () => {
  if(task.trim() !== ""){
   setTodos([...todos, task.trim()]);
   setTask("")
  }
 }
 const deleteTodo = idx => {
  const updatedTodos = todos.filter((_, i) => idx !== i)
  setTodos(updatedTodos)
 }
  return (
    <div>
     <input type="text" onChange={handleInputChange} />
     <button onClick={addTodo}>Add</button>
      {todos.map((idx, todo) => {
       return (
        <>
          <div key={idx}>{todo}</div>
          <div onClick={() => deleteTodo(idx)}>X</div>
        </>
       )
      })}
    </div>
  )
}

export default test
