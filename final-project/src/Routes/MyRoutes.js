import React from 'react'
import { Route, Routes} from 'react-router-dom'
import UserLayout from '../Layout/UserLayout'
import AdminLayout from "../Layout/AdminLayout"
import { Login,Checkout,Pay, Purchase, Home, Panel , WomenProducts, ProductDetail, WTshirts, WShirts, WTrousers, MenProducts, MTrousers,MShirts,MTshirts, Products, Stock, Orders } from '../Pages'
export default function MyRoutes() {
  return (
    <>
    <Routes>
      <Route path='/' element={<UserLayout><Home/></UserLayout>}/>
      <Route path='/product-details' element={<UserLayout><ProductDetail/></UserLayout>}/>
      <Route path ="/login" element={<Login/>}/>
      <Route path ="/checkout" element={<UserLayout><Checkout/></UserLayout>}/>
      <Route path='/pay' element={<UserLayout><Pay/></UserLayout>}/>
      <Route path='/purchase' element={<UserLayout><Purchase/></UserLayout>}/>
      <Route path='/women-products' element={<UserLayout><WomenProducts/></UserLayout>}/>
      <Route path='/women-shirts' element={<UserLayout><WShirts/></UserLayout>}/>
      <Route path='/women-Tshirts' element={<UserLayout><WTshirts/></UserLayout>}/>
      <Route path='/women-trousers' element={<UserLayout><WTrousers/></UserLayout>}/>
      <Route path='/men-products' element={<UserLayout><MenProducts/></UserLayout>}/>
      <Route path='/men-shirts' element={<UserLayout><MShirts/></UserLayout>}/>
      <Route path='/men-Tshirts' element={<UserLayout><MTshirts/></UserLayout>}/>
      <Route path='/men-trousers' element={ <UserLayout><MTrousers/></UserLayout>}/>
      <Route path='/admin-panel' element={<AdminLayout><Panel/></AdminLayout> }>
        <Route path='products' element={ <Products/>}/>
        <Route path='stock' element={ <Stock/>}/>
        <Route path='orders' element={ <Orders/>}/>
      </Route>
    </Routes>
    </>
  )
}

