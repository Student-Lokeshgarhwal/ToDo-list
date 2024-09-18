import { useEffect, useState } from 'react'
import { Todoprovider } from './Context'
import TodoItem from './components/TodoItem'
import TodoForm  from './components/TodoForm'

function App() {

  const [todos,setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id:Date.now(),...todo},...prev])
  }

  const updateTodo = (id,todo) => {
    setTodos((prev) => prev.map((eachtodo) => (eachtodo.id === id ? todo : eachtodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((eachtodo) => (eachtodo.id !== id)) )
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((eachtodo) => eachtodo.id === id ? {...eachtodo, completed:  !eachtodo.completed} : eachtodo))
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todoitems"))

    if(todos && todos.length > 0){
      setTodos(todos)
    }
  },[])

  useEffect(() =>{
    localStorage.setItem("todoitems",JSON.stringify(todos))
  },[todos])

  return (
   <Todoprovider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
   <div className="bg-blue-200 min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-dark">
                    <h1 className="text-3xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                      <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'>
                            {console.log(todo)}
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
   </Todoprovider>
  )
}

export default App

