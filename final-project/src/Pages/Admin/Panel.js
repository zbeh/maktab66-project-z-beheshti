import React, { useState, useEffect} from 'react'
import { Outlet } from 'react-router' 
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setData } from '../../Redux/Reducer/DataReducer'
export default function Panel() {
  const dispatch = useDispatch()
  const[info,setInfo]= useState()
  useEffect(()=>{
    axios.get('http://localhost:3002/products').then(res=>setInfo(res.data))
  },[])
  dispatch(setData(info))
  return (
    <div>
      
      <Outlet/>
    </div>
  )
}
