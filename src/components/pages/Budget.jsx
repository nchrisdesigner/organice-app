import BudgetHeader from "../Budget/BudgetHeader"
import TransactionForm from "../Budget/TransactionForm"
import { useBudgetContext } from "../../context/BudgetContext"
import BudgetSummary from "../Budget/BudgetSummary"
import TransactionFilters from "../Budget/TransactionFilters"
import TransactionList from "../Budget/TransactionList"
import LoadingSpinner from "../Budget/LoadingSpinner"
import ErrorMessage from "../Budget/ErrorMessage"

const Budget = () => {
  const { state } = useBudgetContext()
  const {  transactions, showTransactionForm, isLoading, error } = state

  return (
    <section>
      <BudgetHeader />
      {showTransactionForm && (
        <TransactionForm />
      )}

      {isLoading ?
        <p className="px-2">Loading...</p>
        :
        <main className="px-2 py-4">

         {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <BudgetSummary />
            <TransactionFilters />
            <TransactionList transactions={transactions} />
          </>
        )}
        </main>
      }
    </section>
  )
}

export default Budget