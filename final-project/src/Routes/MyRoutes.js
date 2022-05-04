import React from 'react'
import { Route, Routes} from 'react-router-dom'
import UserLayout from '../Layout/UserLayout'
import { Login,Checkout,Pay, Purchase, Home, Panel , WomenProducts, ProductDetail, WTshirts, WShirts, WTrousers, MenProducts, MTrousers,MShirts,MTshirts, Products, Stock, Orders } from '../Pages'
export default function MyRoutes() {
  return (
    <>
    <Routes>
      <Route path='/' element={<UserLayout><Home/></UserLayout>}/>
      <Route path='/product-details' element={<ProductDetail/>}/>
      <Route path ="/login" element={<Login/>}/>
      <Route path ="/checkout" element={<Checkout/>}/>
      <Route path='/pay' element={<Pay/>}/>
      <Route path='/purchase' element={<Purchase/>}/>
      <Route path='/women-products' element={<WomenProducts/>}/>
      <Route path='/women-shirts' element={<WShirts/>}/>
      <Route path='/women-Tshirts' element={<WTshirts/>}/>
      <Route path='/women-trousers' element={<WTrousers/>}/>
      <Route path='/men-products' element={<MenProducts/>}/>
      <Route path='/men-shirts' element={<MShirts/>}/>
      <Route path='/men-Tshirts' element={<MTshirts/>}/>
      <Route path='/men-trousers' element={ <MTrousers/>}/>
      <Route path='/admin-panel' element={ <Panel/>}>
        <Route path='/products' element={ <Products/>}/>
        <Route path='/stock' element={ <Stock/>}/>
        <Route path='/orders' element={ <Orders/>}/>
      </Route>
    </Routes>
    </>
  )
}

