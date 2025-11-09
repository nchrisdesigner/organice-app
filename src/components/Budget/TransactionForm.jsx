import { useState } from "react"
import { useBudgetContext } from "../../context/BudgetContext"


const TransactionForm = () => {

  const { handleAddTransaction, closeForm } = useBudgetContext()
  const [title, setTitle] = useState()
  const [amount, setAmount] = useState()
  const [type, setType] = useState('income')
  const [isSubmitting, setIsSubmitting] = useState(false)


  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !amount) {
      return
    }
    setIsSubmitting(true)
    const newTransaction = {
      title: title.trim(),
      amount: Number(amount),
      type: type
    }

    const result = await handleAddTransaction(newTransaction)
    if (result.success) {
      setTitle('')
      setAmount(0)
      setType('income')
      closeForm()
    }
    setIsSubmitting(false)
  }


  return (
    <div className="bg-white rounded-sm">
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg border-b border-neutral-300 p-3 px-4 font-medium">New Transaction</h3>
        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm" htmlFor="title">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-sm border border-neutral-300 px-3 py-1 rounded-xs"
              type="text"
              name="title"
              id="title"
              required
              disabled={isSubmitting}
              aria-required="true"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm" htmlFor="amount">Amount</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-sm border border-neutral-300 px-3 py-1 rounded-xs"
              type="number"
              name="amount"
              id="amount" 
              required
              disabled={isSubmitting}
              aria-required="true"
              />
          </div>
          <div className="flex items-center gap-1">
            <label className="font-medium text-sm" htmlFor="type">Type</label>
            <select
              className="font-medium text-sm"
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              disabled={isSubmitting}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="flex gap-2 justify-self-end">
            <button onClick={closeForm} className="border border-neutral-400 py-1 px-4 rounded-xs text-sm cursor-pointer">Cancel</button>
            <button type="submit" className="border border-emerald-500 py-1 px-4 rounded-xs text-sm cursor-pointer bg-emerald-500 text-white transition-all duration-200 hover:bg-emerald-600">{isSubmitting ? 'Creating...' : 'Create'}</button>
          </div>
        </div>


      </form>
    </div>
  )
}

export default TransactionForm


// const [formData, setFormData] = useState({
//   title: '',
//   amount: '',
//   type: 'income'
// })

// const handleChange = (e) => {
//   const { name, value } = e.target
//   setFormData(prev => ({
//     ...prev,
//     [name]: value
//   }))
// }