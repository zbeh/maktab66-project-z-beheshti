import React, { useState, useEffect} from 'react'
import { Outlet } from 'react-router' 
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setData } from '../../Redux/Reducer/DataReducer'
import { addOrders } from '../../Redux/Reducer/OrderReducer'
import { setCategory } from '../../Redux/Reducer/CategoryReducer'
import { setSub } from '../../Redux/Reducer/SubReducer'
import {Typography,Box} from "@mui/material";
export default function Panel() {
  const dispatch = useDispatch()
  const[info,setInfo]= useState()
  const [orders,setOrders]= useState()
  const [cat,setCat] = useState()
  const [subcat,setSubCat]=useState()
  const token = localStorage.getItem('token')
  console.log(token);
  useEffect(()=>{
    axios.get('http://localhost:3002/products').then(res=>setInfo(res.data))
    axios.get('http://localhost:3002/orders',{params:{token:token}})
    .then(response => setOrders(response.data))
    .catch(error=> console.log(error))
    axios.get('http://localhost:3002/category').then(res=>setCat(res.data)).catch(error=> console.log(error))
    axios.get('http://localhost:3002/subCategory').then(res=>setSubCat(res.data)).catch(error=> console.log(error))
  },[])
  dispatch(setData(info))
  dispatch(addOrders(orders))
  dispatch(setCategory(cat))
  dispatch (setSub(subcat))
  
  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" ,display:"flex", justifyContent:"space-between" , width:"40%"}}>
            <Link to='products'>کالاها</Link> 
            <Link to='quantity'> موجودی و قیمت ها</Link> 
            <Link to='orders'>سفارش ها</Link>
            
          </Box>
      <Outlet/>
    </div>
  )
}
