import React, { useState, useEffect} from 'react'
import { Outlet } from 'react-router' 
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setData } from '../../../Redux/Reducer/DataReducer'
import { addOrders } from '../../../Redux/Reducer/OrderReducer'
import { setCategory } from '../../../Redux/Reducer/CategoryReducer'
import { setSub } from '../../../Redux/Reducer/SubReducer'
import {Box, linkClasses} from "@mui/material";
import {Link} from 'react-router-dom'
import panelStyles from './panelStyles.module.scss'
import {setToken} from '../../../Redux/Reducer/TokenReducer'
export default function Panel() {
  const dispatch = useDispatch()
  const[info,setInfo]= useState()
  const [orders,setOrders]= useState()
  const [cat,setCat] = useState()
  const [subcat,setSubCat]=useState()
  const token = localStorage.getItem('token')
  console.log(token);
   dispatch(setToken(token))
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
      <Box className={`${panelStyles.bg} container`} sx={{ display:"flex", justifyContent:"space-between" ,padding:"1rem 2rem", width:"40%"}}>
            <Link className={panelStyles.link} to='products'>کالاها</Link> 
            <Link className={panelStyles.link} to='quantity'> موجودی و قیمت ها</Link> 
            <Link className={panelStyles.link} to='orders'>سفارش ها</Link>
            
        </Box>
      <Outlet/>
    </div>
  )
}
