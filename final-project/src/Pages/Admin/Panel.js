import React, { useState, useEffect} from 'react'
import { Outlet } from 'react-router' 
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setData } from '../../Redux/Reducer/DataReducer'
import { addOrders } from '../../Redux/Reducer/OrderReducer'
export default function Panel() {
  const dispatch = useDispatch()
  const[info,setInfo]= useState()
  const [orders,setOrders]= useState()
  const token = localStorage.getItem('token')
  console.log(token);
  useEffect(()=>{
    axios.get('http://localhost:3002/products').then(res=>setInfo(res.data))
    axios.get('http://localhost:3002/orders',{params:{token:token}})
    .then(response => setOrders(response.data))
    .catch(error=> console.log(error))
  },[])
  dispatch(setData(info))
  dispatch(addOrders(orders))
  return (
    <div>
      <Outlet/>
    </div>
  )
}
