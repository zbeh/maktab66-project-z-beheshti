import React from 'react'
import { Header, Footer  } from '../Components'
export default function UserLayout({children}) {
  return (
    <>
      <Header />
        {children}
      <Footer/>
    </>
  )
}
