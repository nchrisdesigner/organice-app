import { useState } from "react"
import { BiPlus } from "react-icons/bi"
import tasks from "../../data"
import Task from "../../ui/Task"
import { formatDate } from "../../utils/utils"

const newTask = {
      id: 'task-006',
      title: 'Plan weekend hikedadas',
      description: 'Research trails and prepare gear list.',
      completed: false,
      createdAt: formatDate(Date.now()),
      priority: 'medium',
      dueDate: null,
      tags: ['outdoors', 'planning']
    }



const Tasks = () => {
  const [tasksArr, setTasksArr] = useState(tasks)
  
  function handleAddTask(){
    setTasksArr(prev => [...prev, newTask])
    console.log(tasksArr);
    
  }


  return (
    <section>
      <header className="flex justify-between items-center">
       <div>
         <h2 className="text-3xl font-semibold">Tasks</h2>
        <p className="text-md text-slate-500">Manage your tasks and track your progress.</p>
       </div>

       <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded font-medium transition-all duration-200 hover:bg-blue-800 pointer-cursor" onClick={handleAddTask}><BiPlus /> Add Task</button>
      </header>
      <main className="py-8">
        <ul className="flex flex-col gap-2">
          {tasksArr.map((task) => {
            return(
              <Task key={task.id} {...task} />
            )
          })}
        </ul>
      </main>
    </section>
  )
}

export default Tasks

