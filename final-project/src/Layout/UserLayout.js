import React from 'react'
import { Header, Footer, SideBar  } from '../Components'
export default function UserLayout({children}) {
  const currentPath = window.location
  const targetPath = "/all-products"
  return (
    <>
      <Header />
        {currentPath.pathname===targetPath ? <SideBar/> : null}
        {children}
      <Footer/>
    </>
  )
}
