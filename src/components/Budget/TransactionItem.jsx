import { useState } from "react"
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md"
import { useBudgetContext } from "../../context/BudgetContext"

const TransactionItem = ({ transaction }) => {
  const { handleDeleteTransaction } = useBudgetContext()
  const [isDeleting, setIsDeleting] = useState(false)
  const { id, title, desc, amount, type } = transaction

  const handleDelete = async () => {
    if (isDeleting) return

    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`)
    if (!confirmed) return

    setIsDeleting(true)
    const result = await handleDeleteTransaction(id)
    
    if (!result.success) {
      alert(`Failed to delete transaction: ${result.error}`)
      setIsDeleting(false)
    }
  }

  return (
    <li 
      className={`p-4 bg-white flex justify-between rounded-sm border border-neutral-200 transition-opacity ${
        isDeleting ? 'opacity-50' : ''
      }`}
    >
      <div>
        <h3 className="font-medium capitalize flex items-center gap-3">
          {type === 'income' ? (
            <IoMdTrendingUp className="text-emerald-500" aria-label="Income" />
          ) : (
            <IoMdTrendingDown className="text-red-500" aria-label="Expense" />
          )}
          {title}
        </h3>
        {desc && <p className="text-sm text-neutral-600">{desc}</p>}
        <time className="text-xs text-neutral-400" dateTime="2025-11-08">
          Nov 8, 2025
        </time>
      </div>

      <div className="flex flex-col items-end gap-4">
        <p
          className={`text-xl font-semibold ${
            type === 'income' ? 'text-emerald-500' : 'text-red-500'
          }`}
          aria-label={`${type === 'income' ? 'Income' : 'Expense'} of ${amount} euros`}
        >
          {type === 'income' ? '+' : '-'}
          {amount}€
        </p>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-500 bg-red-50 p-1 rounded-xs text-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-100"
          aria-label={`Delete ${title} transaction`}
        >
          <MdDeleteOutline />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem