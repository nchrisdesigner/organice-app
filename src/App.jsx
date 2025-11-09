import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Layout from './components/layout/Layout'
import Dashboard from './components/pages/Dashboard'
import Tasks from './components/pages/Tasks'
import Notes from './components/pages/nOTES.JSX'
import Budget from './components/pages/Budget'
import NotFound from './components/pages/NotFound'
import { BudgetProvider } from './context/BudgetContext'


const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children:[
      {
        index: true,
        element: <Dashboard />
      },
      {
        path:"tasks",
        element: <Tasks />
      },
      {
        path:"notes",
        element: <Notes />
      },
      {
        path: "budget",
        element: <BudgetProvider><Budget /></BudgetProvider>
      },
      {
        path:"*",
        element: <NotFound />
      }
    ]
  }
])

function App() {


  return (
   <RouterProvider router={router} />
  )
}

export default App
