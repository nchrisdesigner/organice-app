import { useBudgetContext } from "../../context/BudgetContext"
import TransactionItem from "./TransactionItem"

const TransactionList = () => {
  const { state  } = useBudgetContext()
  const {transactions} = state

  return (
    <div>
      <ul className="flex flex-col gap-3" aria-label="Transaction list">
        {transactions.map((transaction) => {
          return (
            <TransactionItem key={transaction.id} transaction={transaction} />
          )
        })}

        {transactions.length === 0 && <p>No transactions yet</p>}
      </ul>
    </div>
  )
}

export default TransactionList