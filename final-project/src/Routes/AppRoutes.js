import React from 'react'
import { Route, Routes} from 'react-router-dom'
import UserLayout from '../Layout/UserLayout'
import AdminLayout from "../Layout/AdminLayout"
import { Login,Checkout,Pay, Purchase, Home, Panel , WomenProducts, ProductDetail, WTshirts, WShirts, WTrousers, MenProducts, MTrousers,MShirts,MTshirts, Products, Stock, Orders } from '../Pages'
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
      <Route path='/admin-panel' element={<AdminLayout><Panel/></AdminLayout> }>
        <Route path='products' element={ <Products/>}/>
        <Route path='quantity' element={ <Quantity/>}/>
        <Route path='orders' element={ <Orders/>}/>
      </Route>
    </Routes>
    </>
  )
}

