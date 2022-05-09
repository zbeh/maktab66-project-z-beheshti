import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState ,useEffect} from 'react';
import { Typography,Button } from '@mui/material';
import axios from "axios"
import { useSelector } from 'react-redux';
const columns = [
  { field: 'image', headerName: 'تصویر کالا', width: 130 ,sortable: false, type:"image"},
  { field: 'name', headerName: 'نام کالا', width: 130 ,  sortable: false, },
  { field: 'category', headerName: 'دسته بندی', width: 130 },
  { field: 'edit', headerName: '', width: 130 ,  sortable: false,},

];
export default function Products() {
    const data = useSelector(state=>state.data)
    const [row,setRow]=useState([])
     
    useEffect(()=>{
      data?.map(d=>setRow(r=>[...r,{id:d.id,image:d.thumbnail,name:d.name,category:d.category,edit:"ویرایش-حذف"}]))
    },[data])
    let uniqueRow = [...new Set(row)];
    console.log(data);
    // console.log(row);
    console.log(uniqueRow);
      
     

  return (
    <>
    <div className="container d-flex justify-between" style={{marginTop:"3rem"}}>
    <Typography variant="h6" component="div" sx={{fontWeight:"bold"}}> مدیریت کالاها </Typography>
      <Button variant="contained">افزودن کالا</Button>

    </div>
    
    <div className="container" style={{ height: 400, direction:"ltr", width:700,marginTop:'3rem'}} >
      <DataGrid
        rows ={uniqueRow}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
      />
    </div>
    </>
  );
}

