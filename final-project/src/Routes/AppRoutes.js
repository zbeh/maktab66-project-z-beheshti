import React from 'react'
import { Route, Routes} from 'react-router-dom'
import UserLayout from '../Layout/UserLayout'
import AdminLayout from "../Layout/AdminLayout"
import { Login,Checkout,Pay, Purchase, Home, Panel ,AllProducts, ProductDetail,Products,Quantity, Orders,ProtectedRoute } from '../Pages'
export default function AppRoutes() {
  return (
    <>
    <Routes>
      <Route path='/' element={<UserLayout><Home/></UserLayout>}/>
      <Route path='/product-details' element={<UserLayout><ProductDetail/></UserLayout>}/>
      <Route path ="/login" element={<Login/>}/>
      <Route path ="/checkout" element={<UserLayout><Checkout/></UserLayout>}/>
      <Route path='/pay' element={<UserLayout><Pay/></UserLayout>}/>
      <Route path='/purchase' element={<UserLayout><Purchase/></UserLayout>}/>
      <Route path='/all-products' element={<UserLayout><AllProducts/></UserLayout>}/>
      <Route path='/admin-panel' element={<ProtectedRoute><AdminLayout><Panel/></AdminLayout></ProtectedRoute> }>
        <Route path='products' element={ <Products/>}/>
        <Route path='quantity' element={ <Quantity/>}/>
        <Route path='orders' element={ <Orders/>}/>
      </Route>
    </Routes>
    </>
  )
}

