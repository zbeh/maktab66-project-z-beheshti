import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { Typography} from '@mui/material';
import Radio from '@mui/material/Radio';
import { DataGrid } from '@mui/x-data-grid';
import orderStyles from './orderStyles.module.scss'
import { useSelector } from 'react-redux';
export default function Orders() {
  const [row,setRow] = useState([])
  const [newRow,setNewRow] = useState([])
  const [selectedValue, setSelectedValue] =useState('b');
  const data = useSelector(state=>state.orders)
  console.log(data);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
   useEffect(()=>{
    data?.map(d=>d.orderStatus==2 && setRow(r=>[...r,{id:d.id,name:d.customerDetail.firstName+" "+d.customerDetail.lastName,purchaseTotal:d.purchaseTotal,orderDate:new Date(d.orderDate).toLocaleDateString("fa-IR"), orderChecking:"بررسی سفارش"}]))
    data?.map(d=>d.orderStatus==1 && setNewRow(r=>[...r,{id:d.id,name:d.customerDetail.firstName+" "+d.customerDetail.lastName,purchaseTotal:d.purchaseTotal,orderDate:new Date(d.orderDate).toLocaleDateString("fa-IR"), orderChecking:"بررسی سفارش"}]))
  },[])

  console.log(data);
  console.log(row)
    
  const columns = [
    { field: 'name', headerName: 'نام کاربر', width: 130 ,  sortable: false, },
    { field: 'purchaseTotal', headerName: 'مجموع مبلغ', width: 130 ,sortable:false},
    { field: 'orderDate', headerName: 'زمان ثبت سفارش', width: 130 },
    { field: 'orderChecking', headerName: '', width: 130 ,sortable:false},
  
  ];
  return (
    <>
    <div className={`${orderStyles.tcontainer,orderStyles.mt3} container d-flex justify-between`}>
    <Typography variant="h6" component="div" className={`${orderStyles.fbold} container`}> مدیریت سفارش ها </Typography>
      <div className={orderStyles.radio}>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
       <label>سفارش های تحویل شده</label>
     
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'B' }}
      />
      <label>سفارش های در انتظار ارسال</label>
      </div>

    </div>
    
    <div className={`${orderStyles.tcontainer} container`} >
      {selectedValue==='b'?
          <DataGrid
          rows ={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]}
          rowHeight={100}
          className={orderStyles.table}
        />:""
  
      }
      
      {selectedValue==='a'?
        <DataGrid
        rows ={newRow}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        rowHeight={100}
        className={orderStyles.table}
      />:""
      }
    </div>
    </>
  )
}
