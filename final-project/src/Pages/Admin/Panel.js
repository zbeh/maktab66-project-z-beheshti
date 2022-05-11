import React, { useState, useEffect} from 'react'
import { Outlet } from 'react-router' 
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setData } from '../../Redux/Reducer/DataReducer'
import { setCategory } from '../../Redux/Reducer/CategoryReducer'
import { setSub } from '../../Redux/Reducer/SubReducer'
export default function Panel() {
  const dispatch = useDispatch()
  const[info,setInfo]= useState()
  const [cat,setCat] = useState()
  const [subcat,setSubCat]=useState()
  useEffect(()=>{
    axios.get('http://localhost:3002/products').then(res=>setInfo(res.data))
    axios.get('http://localhost:3002/category').then(res=>setCat(res.data))
    axios.get('http://localhost:3002/subCategory').then(res=>setSubCat(res.data))
  },[])
  dispatch(setData(info))
  dispatch(setCategory(cat))
  dispatch (setSub(subcat))
  return (
    <div>
      <Outlet/>
    </div>
  )
}
