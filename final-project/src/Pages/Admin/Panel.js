import React from 'react'
import { Outlet } from 'react-router'

export default function Panel() {
  return (
    <div>
      Panel
      <Outlet/>
    </div>
  )
}
