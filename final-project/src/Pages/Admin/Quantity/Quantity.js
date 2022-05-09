import React from 'react'
import { useSelector } from 'react-redux';
import { useState,useEffect} from 'react';
import { Typography,Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import quantityStyles from './quantityStyles.module.scss'

export default function Quantity() {
  const columns = [
    // { field: "_id", hide: true },
    { field: 'name', headerName: 'نام کالا', width: 130 ,  sortable: false, },
    { field: 'price', headerName: 'قیمت', width: 130 },
    { field: 'quantity', headerName: 'موجودی', width: 130 ,  sortable: false,},
  ];
  const data = useSelector(state=>state.data)
  const [row,setRow]=useState([])
  useEffect(()=>{
   data.map(d=>setRow(row=>[...row,{id:d.id,name:d.name,price:d.price,quantity:d.count}]))
  },[])
  console.log(row);
  
  return (
    <>
      <div className={`${quantityStyles.container} container d-flex justify-between`}>
      <Typography variant="h6" component="div" sx={{fontWeight:"bold"}}> مدیریت موجودی و قیمت ها </Typography>
      <Button variant="contained" sx={{p:'.5rem 2rem', fontWeight:"bold"}}>ذخیره</Button>
    </div>
    <div className={`${quantityStyles.tcontainer} container`} >
      
      <DataGrid
        rows ={row}
        columns={columns}
        // getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[10]}
        sx={{fontSize:"medium" , fontWeight:'bold', textAlign:'center'}}
      />
    </div>
    </>
  )
}
