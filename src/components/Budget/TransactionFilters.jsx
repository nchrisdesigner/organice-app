import { useBudgetContext } from "../../context/BudgetContext";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io"

const FILTER_OPTIONS = [
  { id: 0, title: 'all', icon: null },
  { id: 1, title: 'incomes', icon: <IoMdTrendingUp /> },
  { id: 2, title: 'expenses', icon: <IoMdTrendingDown /> }
]

const TransactionFilters = () => {
  const { state, setFilter } = useBudgetContext()
  const { filter } = state

  return (
    <div className="py-4 flex">
      <div className="flex gap-1 border border-neutral-400 p-1 rounded-sm bg-gray-200">
        {FILTER_OPTIONS.map((option) => {
          const { id, title, icon } = option
          return (
            <button 
            key={id}
            onClick={() => setFilter(id)}
            className={`flex items-center gap-2 cursor-pointer hover:bg-white py-1 px-3 transition duration-200 capitalize rounded-sm ${title === filter ? 'bg-white' : null}`}
            >
              {icon} {title}
            </button>
          )
        })}
      </div>

    </div>
  )
}

export default TransactionFilters
