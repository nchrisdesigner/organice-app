import { LiaPlusSolid } from "react-icons/lia"
import { IoWalletOutline } from "react-icons/io5"
import { IoMdTrendingUp } from "react-icons/io"
import { IoMdTrendingDown } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md"
import { useEffect, useReducer, useState } from "react"
import { addTransaction, deleteTransaction, getTransactions } from "../../services/budgetService"

const transactionFilterOptions = [
  {
    id: 0,
    title: 'all',
    type: 'all',
    icon: null
  },
  {
    id: 1,
    title: 'incomes',
    type: 'income',
    icon: <IoMdTrendingUp />
  },
  {
    id: 2,
    title: 'expenses',
    type: 'expense',
    icon: <IoMdTrendingDown />
  },
]



const initialState = {
  balance: 57650,
  transactions: [],
  allTransactions: [],
  filter: 'all',
  showTransactionForm: false,
  isLoading: false,
  isDeleting: false,
  error: null
}

function reducer(state, action) {

  if (action.type === 'LOADING') {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === 'ERROR') {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    }
  }

  if (action.type === 'TRANSACTIONS_LOADED') {


    return {
      ...state,
      isLoading: false,
      transactions: action.payload,
      allTransactions: action.payload,
    }
  }

  if (action.type === 'SET_FILTER_TYPE') {
    const selectedFilter = transactionFilterOptions[action.payload]
    return {
      ...state,
      filter: selectedFilter.title,
      transactions: selectedFilter.type === 'all'
        ? state.allTransactions
        : state.allTransactions.filter(transaction => transaction.type === selectedFilter.type)
    }
  }

  if (action.type === 'DELETE_TRANSACTION') {
    const updatedAllTransactions = state.allTransactions.filter(transaction => transaction.id !== action.payload)


    const selectedFilterOption = transactionFilterOptions.find(option => option.title === state.filter)
    const updatedTransactions = selectedFilterOption.type === 'all'
      ? updatedAllTransactions
      : updatedAllTransactions.filter(t => t.type === selectedFilterOption.type)

    return {
      ...state,
      allTransactions: updatedAllTransactions,
      transactions: updatedTransactions
    }
  }


  if (action.type === 'ADD_TRANSACTION') {
    const newTransaction = action.payload
    const updatedAllTransactions = [...state.allTransactions, newTransaction]

    const selectedFilterOption = transactionFilterOptions.find(option => option.title === state.filter)
    const updatedTransactions = selectedFilterOption.type === 'all'
      ? updatedAllTransactions
      : updatedAllTransactions.filter(t => t.type === selectedFilterOption.type)


    return {
      ...state,
      allTransactions: updatedAllTransactions,
      transactions: updatedTransactions,
      balance: action.payload.type === 'income'
        ? state.balance + Number(action.payload.amount)
        : state.balance - Number(action.payload.amount)
    }
  }

  if (action.type === 'OPEN_FORM') {
    return {
      ...state,
      showTransactionForm: true
    }
  }

  if (action.type === 'CLOSE_FORM') {
    return {
      ...state,
      showTransactionForm: false
    }
  }

  throw new Error(`No matching ${action.type} - action type`)

}

const Budget = () => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('income')
  const [state, dispatch] = useReducer(reducer, initialState)
  const { balance, transactions, filter, showTransactionForm, isLoading } = state

  useEffect(function () {
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


  function handleFilter(id) {
    dispatch({ type: 'SET_FILTER_TYPE', payload: id })
  }

  async function hanldeDeleteTransaction(id) {
    try {
      await deleteTransaction(id)
      dispatch({ type: 'DELETE_TRANSACTION', payload: id })
    }
    catch (error) {
      console.error('Failed to delete transaction:', error)
    }
  }

  function handleOpenForm() {
    dispatch({ type: 'OPEN_FORM' })
  }
  function handleCloseForm() {
    dispatch({ type: 'CLOSE_FORM' })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const newTransaction = {
      title: title,
      amount: Number(amount),
      type: type
    }

    try{
      const data = await addTransaction(newTransaction)
      console.log(data);
      
      dispatch({ type: 'ADD_TRANSACTION', payload: data[0] })
      
    }
    catch(error){
      onsole.error('Failed to add transaction:', error)
    }



    setTitle('')
    setAmount(0)
    dispatch({ type: 'CLOSE_FORM' })
  }


  return (
    <section>
      <header className="px-2 py-3 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold">Budget</h2>
          <p className="text-neutral-400">Track your income and expenses</p>
        </div>

        <button onClick={handleOpenForm} className="flex items-center gap-2 text-sm bg-emerald-500 text-white py-2 px-3 rounded-xs cursor-pointer transtion-all duration-300 hover:bg-emerald-600"><LiaPlusSolid /> New Transaction</button>
      </header>

      {showTransactionForm && (

        <div className="bg-white rounded-sm">
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg border-b border-neutral-300 p-3 px-4 font-medium">New Transaction</h3>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-sm" htmlFor="title">Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="text-sm border border-neutral-300 px-3 py-1 rounded-xs" type="text" name="title" id="title" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-sm" htmlFor="amount">Amount</label>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} className="text-sm border border-neutral-300 px-3 py-1 rounded-xs" type="number" name="amount" id="amount" />
              </div>
              <div className="flex items-center gap-1">
                <label className="font-medium text-sm" htmlFor="type">Type</label>
                <select
                  className="font-medium text-sm"
                  name="type"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="flex gap-2 justify-self-end">
                <button onClick={handleCloseForm} className="border border-neutral-400 py-1 px-4 rounded-xs text-sm cursor-pointer">Cancel</button>
                <button type="submit" className="border border-emerald-500 py-1 px-4 rounded-xs text-sm cursor-pointer bg-emerald-500 text-white transition-all duration-200 hover:bg-emerald-600">Create</button>
              </div>
            </div>


          </form>
        </div>
      )}

      {isLoading ?
        <p className="px-2">Loading...</p>
        :
        <main className="px-2 py-4">

          <div className="grid grid-cols-3 gap-8">
            <div className="border border-neutral-400 rounded-sm p-4 flex flex-col gap-4 bg-gray-50">

              <h3 className="font-regular text-base">Balance</h3>
              <div className="flex justify-between">
                <IoWalletOutline className="text-2xl" />
                <h4 className="text-xl font-medium">{balance}€</h4>
              </div>

            </div>
            <div className="border border-neutral-400 rounded-sm p-4 flex flex-col gap-4 bg-gray-50">

              <h3 className="font-regular text-base">Income</h3>
              <div className="flex justify-between">
                <IoMdTrendingUp className="text-2xl text-emerald-500" />
                <h4 className="text-xl font-medium">{balance}€</h4>
              </div>

            </div>
            <div className="border border-neutral-400 rounded-sm p-4 flex flex-col gap-4 bg-gray-50">

              <h3 className="font-regular text-base">Expense</h3>
              <div className="flex justify-between">
                <IoMdTrendingDown className="text-2xl text-red-400" />
                <h4 className="text-xl font-medium">{balance}€</h4>
              </div>

            </div>

          </div>


          <div className="py-4 flex">
            <div className="flex gap-1 border border-neutral-400 p-1 rounded-sm bg-gray-200">

              {transactionFilterOptions.map((option) => {
                const { id, title, icon } = option
                return (
                  <button onClick={() => handleFilter(id)} key={id} className={`flex items-center gap-2 cursor-pointer hover:bg-white py-1 px-3 transition duration-200 capitalize rounded-sm ${title === filter ? 'bg-white' : null}`}>{icon}{title}</button>
                )
              })}
            </div>
          </div>


          <div>
            <ul className="flex flex-col gap-3">

              {transactions.map((transaction) => {
                const { id, title, desc, amount, type } = transaction
                return (
                  <li key={id} className="p-4 bg-white flex justify-between rounded-sm border border-neutral-200" >
                    <div>
                      <h4 className="font-medium capitalize flex items-center gap-3">
                        {type === 'income' ? <IoMdTrendingUp className="text-emerald-500" /> : <IoMdTrendingDown className="text-red-500" />}
                        {title}</h4>
                      <p className="text-sm">{desc}</p>
                      <p className="text-xs text-neutral-400">Nov 8, 2025</p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <h4 className={`text-xl font-semibold  ${type === 'income' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {type === 'income' ? '+' : '-'}
                        {amount}

                      </h4>
                      <MdDeleteOutline onClick={() => hanldeDeleteTransaction(id)} className="text-red-500 bg-red-50 flex items-center justify-center rounded-xs text-lg cursor-pointer hover:bg-red-100 transition duration-300" />
                    </div>
                  </li>
                )
              })}

              {transactions.length === 0 && <p>No transactions yet</p>}
            </ul>
          </div>
        </main>
      }
    </section>
  )
}

export default Budget