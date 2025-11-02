import { RiPuzzle2Line } from "react-icons/ri"
import Menu from "./Menu"


const Sidebar = () => {
  return (
    <aside className='bg-white'>
      <div className="border-b border-slate-300">
        <div className="p-4">
          <h1 className="text-blue-600 text-4xl font-semibold flex gap-2 "><RiPuzzle2Line /> Organice</h1>
        <p className="text-sm">Note Taker and Task Manager</p>
        </div>
      </div>

      <Menu />
    </aside>
  )
}

export default Sidebar