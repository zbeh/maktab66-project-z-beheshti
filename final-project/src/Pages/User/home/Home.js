import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import homeStyles from './homeStyles.module.scss'
export default function Home() {
  const [data,setData] = useState()
  const [cat,setCat] = useState()
  useEffect(()=>{
    axios.get('http://localhost:3002/products').then(res=>setData(res.data)).catch(err=>console.log(err))
    axios.get('http://localhost:3002/category').then(res=>setCat(res.data)).catch(error=> console.log(error))
  },[])
  const handleClick = (e) =>{
    console.log(e.target);
  }
  return (
    <>
    <div className={`${homeStyles.homeContainer} container`}>
      <Link to={`/all-products`} onClick={handleClick} className={homeStyles.link}>{cat?.find(c=>c.id==1).name}</Link>
      <div className={`${homeStyles.cardConatiner} `}>
        {(data?.filter(d=>d.category == 1))?.slice(0, 8).map(d=>(
        <>
        <div className={homeStyles.card}>
        <div className={homeStyles.imgContainer}>
         <img src={`http://localhost:3002/files/${d.images[0]}` }/>
        </div>
         <div className={homeStyles.contentContainer} >
          <p>{d.name}</p>
         </div>
         <div className={homeStyles.contentContainer}>
           <p>{d.price} تومان</p>
         </div>
        </div>
        </>
         ) )}

      </div>
      <Link to={`/all-products/`} className={homeStyles.link}>{cat?.find(c=>c.id==2).name}</Link>
      <div className={`${homeStyles.cardConatiner} `}>
        {(data?.filter(d=>d.category == 2))?.slice(0, 8).map(d=>(
        <>
        <div className={homeStyles.card}>
        <div className={homeStyles.imgContainer}>
         <img src={`http://localhost:3002/files/${d.images[0]}` }/>
        </div>
         <div className={homeStyles.contentContainer} >
          <p>{d.name}</p>
         </div>
         <div className={homeStyles.contentContainer}>
           <p>{d.price} تومان</p>
         </div>
        </div>
        </>
         ) )}

      </div>
     
    </div>
    
    </>
  )
}
