import { FaRegCheckCircle } from "react-icons/fa"
import { FaRegClock } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { FiEdit2 } from "react-icons/fi";


const Task = ({id, title, description, completed, createdAt,priority, dueDate,tags}) => {
  return (
    <li className="flex justify-between max-w-[600px] border border-slate-200 p-4 shadow-md rounded bg-white">
      
      <div className="flex flex-col justify-start items-start gap-2">
        <div className="flex gap-4 items-center">
          {
        completed ? <FaRegCheckCircle className="text-emerald-500" /> : <FaRegClock className="text-slate-400" />
      }
          <h2 className="text-lg font-semibold">{title}</h2>
          <span className="text-xs rounded-full bg-emerald-200 px-3 py-1 ">{priority}</span>
        </div>
        <p className="text-sm">{description}</p>
        <span className="text-xs bg-slate-200 text-slate-500 px-2 py-1 font-medium rounded">{createdAt}</span>
      </div>
      <div className="flex gap-2">
        <FiEdit2 className="bg-sky-100 text-sky-400 flex items-center justify-center p-1 h-6 w-6 rounded cursor-pointer" />
        <MdDelete className="bg-red-100 text-red-400 flex items-center justify-center p-[3px] h-6 w-6 rounded cursor-pointer" />
      </div>
    </li>
  )
}

export default Task

