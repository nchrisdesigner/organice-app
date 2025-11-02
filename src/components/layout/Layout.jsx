import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <section className='grid grid-cols-[25fr_75fr] h-screen bg-slate-50'>
      <Sidebar />
      <main className='p-4'>
        <Outlet />
      </main>

    </section>
  )
}

export default Layout