import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import homeStyles from './homeStyles.module.scss'
import { Card } from '../../../Components'
export default function Home() {
  const [data,setData] = useState()
  const [men,setMen] = useState()
  const [cat,setCat] = useState()
  useEffect(()=>{
    axios.get('http://localhost:3002/products?_start=0&_end=8&category=1').then(res=>setData(res.data)).catch(err=>console.log(err))
    axios.get('http://localhost:3002/products?_start=0&_end=8&category=2').then(res=>setMen(res.data)).catch(err=>console.log(err))
    axios.get('http://localhost:3002/category').then(res=>setCat(res.data)).catch(error=> console.log(error))
  },[])
  const handleClick = (e) =>{
    console.log(e.target);
  }
  return (
    <>
    <div className={`${homeStyles.homeContainer} container`}>
      <Link to="/all-products" state={{from:`${1}`}} onClick={handleClick} className={homeStyles.link}>{cat?.find(c=>c.id==1).name}</Link>
      <div className={`${homeStyles.cardConatiner} `}>
        {data?.map(d=>(
        <>
        <Card item ={d}/>
        </>
         ) )}

      </div>
      <Link to="/all-products" state={{from:`${2}`}} className={homeStyles.link}>{cat?.find(c=>c.id==2).name}</Link>
      <div className={`${homeStyles.cardConatiner} `}>
        {men?.map(d=>(
        <>
         <Card item={d} />
        </>
         ) )}

      </div>
     
    </div>
    
    </>
  )
}
