import React, { Children } from 'react'
import { AdminNavBar } from '../Components'
export default function AdminLayout({children}) {
  return (
    <>
    <AdminNavBar/>
    {children}
    </>
  )
}
