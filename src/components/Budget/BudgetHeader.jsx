import { LiaPlusSolid } from "react-icons/lia"
import { useBudgetContext } from "../../context/BudgetContext"


const BudgetHeader = () => {
  const { openForm } = useBudgetContext()
  return (
    <header className="px-2 py-3 flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-semibold">Budget</h2>
        <p className="text-neutral-400">Track your income and expenses</p>
      </div>

      <button onClick={openForm} className="flex items-center gap-2 text-sm bg-emerald-500 text-white py-2 px-3 rounded-xs cursor-pointer transition-all duration-300 hover:bg-emerald-600"><LiaPlusSolid /> New Transaction</button>

    </header>
  )
}

export default BudgetHeader