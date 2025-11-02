import { MdOutlineDashboard } from "react-icons/md"
import { AiOutlineCreditCard } from "react-icons/ai"
import { FaRegStickyNote } from "react-icons/fa"
import { BiTask } from "react-icons/bi"
import { NavLink } from "react-router"

const menuItems = [
  {
    id: 1,
    icon: <MdOutlineDashboard />,
    text: "Dashboard",
    path: "/"
  },
  {
    id: 2,
    icon: <BiTask />,
    text: "Tasks",
    path: "/tasks"
  },
  {
    id: 3,
    icon: <FaRegStickyNote />,
    text: "Notes",
    path: "/notes"
  },
  {
    id: 4,
    icon: <AiOutlineCreditCard />,
    text: "Budget",
    path: "/budget"
  }
]

const Menu = () => {
  return (
    <nav className="p-4">
      <ul className="flex flex-col gap-2">
        {menuItems.map((item,index) => {
          const {id, icon, text, path} = item
          return(
            <li key={id} >
              <NavLink to={path} className={`flex items-center gap-2 text-lg p-2   border-l-3 rounded border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300`}>
                {icon} {text}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Menu