import { createContext, useContext, useReducer, useEffect } from "react"
import { getTransactions, deleteTransaction, addTransaction } from "../services/budgetService"

const initialState = {
  balance: 57650,
  transactions: [],
  allTransactions: [],
  filter: 'all',
  showTransactionForm: false,
  isLoading: false,
  error: null
}


const FILTER_OPTIONS = [
  { id: 0, title: 'all', type: 'all' },
  { id: 1, title: 'incomes', type: 'income' },
  { id: 2, title: 'expenses', type: 'expense' }
]

function applyFilter(allTransactions, filterTitle) {
  const selectedFilter = FILTER_OPTIONS.find(option => option.title === filterTitle)

  if (selectedFilter.type === 'all') {
    return allTransactions
  }

  return allTransactions.filter(transaction => transaction.type === selectedFilter.type)
}


function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
        error: null
      }

    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    case 'TRANSACTIONS_LOADED':
      const calculatedBalance = action.payload.reduce((acc, transaction) => {
        return transaction.type === 'income' 
        ? acc + Number(transaction.amount)
        : acc - Number(transaction.amount)
      }, initialState.balance)
      return {
        ...state,
        isLoading: false,
        transactions: action.payload,
        allTransactions: action.payload,
        balance: calculatedBalance
      }

    case 'SET_FILTER': {
      const selectedFilter = FILTER_OPTIONS[action.payload]
      return {
        ...state,
        filter: selectedFilter.title,
        transactions: applyFilter(state.allTransactions, selectedFilter.title)
      }
    }

    case 'DELETE_TRANSACTION': {
      const updatedAllTransactions = state.allTransactions.filter(
        transaction => transaction.id !== action.payload
      )

      return {
        ...state,
        allTransactions: updatedAllTransactions,
        transactions: applyFilter(updatedAllTransactions, state.filter)
      }
    }

    case 'ADD_TRANSACTION': {
      const newTransaction = action.payload
      const updatedAllTransactions = [...state.allTransactions, newTransaction]

      return {
        ...state,
        allTransactions: updatedAllTransactions,
        transactions: applyFilter(updatedAllTransactions, state.filter),
        balance: newTransaction.type === 'income'
          ? state.balance + Number(newTransaction.amount)
          : state.balance - Number(newTransaction.amount)
      }
    }

    case 'TOGGLE_FORM':
      return {
        ...state,
        showTransactionForm: action.payload
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}


const BudgetContext = createContext()

export function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchTransactions() {
      try {
        dispatch({ type: 'LOADING' })
        const data = await getTransactions()
        dispatch({ type: 'TRANSACTIONS_LOADED', payload: data })


      } catch (error) {
        dispatch({ type: 'ERROR', payload: error.message })
      }
    }
    fetchTransactions()
  }, [])

  function setFilter(filterId) {
    dispatch({ type: 'SET_FILTER', payload: filterId })
  }

  async function handleDeleteTransaction(id) {
    try {
      await deleteTransaction(id)
      dispatch({ type: 'DELETE_TRANSACTION', payload: id })
      return { success: true }
    } catch (error) {
      console.error('Failed to delete transaction:', error)
      return { success: false, error: error.message }
    }
  }

  async function handleAddTransaction(newTransaction) {
    try {
      const data = await addTransaction(newTransaction)
      dispatch({ type: 'ADD_TRANSACTION', payload: data[0] })
      return { success: true }
    } catch (error) {
      console.error('Failed to add transaction:', error)
      return { success: false, error: error.message }
    }
  }


  function openForm() {
    dispatch({ type: 'TOGGLE_FORM', payload: true })
  }
  function closeForm() {
    dispatch({ type: 'TOGGLE_FORM', payload: false })
  }



  return (
    <BudgetContext.Provider value={{
      state,
      setFilter,
      handleDeleteTransaction,
      handleAddTransaction,
      openForm,
      closeForm
    }}>
      {children}
    </BudgetContext.Provider>
  )

}


export function useBudgetContext() {
  const context = useContext(BudgetContext)
  if (!context) {
    throw new Error('useBudgetContext must be used within a BudgetProvider')
  }

  return context
}