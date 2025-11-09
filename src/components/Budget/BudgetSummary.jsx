import { IoWalletOutline } from "react-icons/io5"
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io"
import { useBudgetContext } from "../../context/BudgetContext"
import SummaryCard from "./SummaryCard"


const BudgetSummary = () => {
  const { state } = useBudgetContext()
  const { allTransactions, balance } = state

  const totalIncome = allTransactions.filter(transaction => transaction.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0)
  const totalExpense = allTransactions.filter(transaction => transaction.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0)

 

  return (
    <div className="grid grid-cols-3 gap-8 mb-4" role="region" aria-label="Budget summary">
      <SummaryCard
        title="Balance"
        amount={balance}
        icon={<IoWalletOutline className="text-2xl" />}
        colorClass=""
      />

      <SummaryCard
        title="Income"
        amount={totalIncome}
        icon={<IoMdTrendingUp className="text-2xl text-emerald-500" />}
        colorClass="text-emerald-500"
        showSign="+"
      />

      <SummaryCard
        title="Expense"
        amount={totalExpense}
        icon={<IoMdTrendingDown className="text-2xl text-red-400" />}
        colorClass="text-red-500"
        showSign="-"
      />
    </div>
  )
}

export default BudgetSummary